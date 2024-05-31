import db from "../models";
import dotenv from "dotenv";
dotenv.config();
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";

import nodemailer from "nodemailer";
import { handleUpdateUserById } from "./userService";
import { handleCountPoint, mailPaymentTemplate } from "../ultils/helper";

export const handleGetOrderByUserId = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!user_id) {
        resolve("user_id is not null");
      }
      const res = await db.Order.findAll({
        where: {
          user_id: user_id,
        },
        include: [
          {
            model: db.Allcodes,
            as: "paymentData",
          },
          {
            model: db.Allcodes,
            as: "statusData",
          },
        ],
        subQuery: false,
        raw: true,
        nest: true,
      });
      if (!res || (res && res.length === 0)) {
        resolve("Order does not exist");
      }
      resolve({
        results: res,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const handleCreateOrder = async (data, option) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheck = true;
      const fields = [
        "user_id",
        "email",
        "total",
        "status",
        "payment_id",
        "listItem",
        "address",
      ];
      fields.forEach((item) => {
        if (!data[item]) {
          resolve(`${item} is not null`);
          isCheck = false;
        }
        if (item === "listItem" && data[item].length === 0) {
          resolve(`${item} is not null`);
          isCheck = false;
        }
      });
      if (isCheck) {
        const res = await db.Order.create({
          ...data,
          user_id: data.user_id,
          order_id: uuidv4(),
        });
        if (!res) {
          resolve("create is fail");
        }
        const dt = data.listItem.map((item) => {
          return {
            ...item,
            product_id: item.product_id,
            order_id: res.order_id,
          };
        });
        const result = await db.OrderItem.bulkCreate(dt);

        if (result && result.length === 0) {
          resolve("create is fail");
        }
        const resultDelete = await db.CartItem.destroy({
          where: {
            user_id: data.user_id,
          },
        });
        if (resultDelete < 1) {
          resolve("create is fail");
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "quankun0978@gmail.com",
            pass: "kihf jegs xrwd momk",
          },
        });
        const mailOption = {
          from: process.env.EMAIL_ID,
          to: data.email,
          subject: option.subject,
          html: option.message,
        };
        if (data.code_id) {
          const resultDeleteVoucher = await db.Code.destroy({
            where: {
              code_id: code_id,
            },
          });
          if (resultDeleteVoucher !== 1) {
            resolve("Code is not essits");
          }
        }
        if (data.status === "done") {
          const resultUpdate = await handleUpdateUserById({
            user_id: data.user_id,
            point: data.point + handleCountPoint(data.total),
          });
          if (resultUpdate && !resultUpdate.results) {
            resolve("error add point");
          }
        }

        await transporter.sendMail(mailOption, (err, info) => {
          if (err) {
            reject(err);
          }

          resolve({
            results: "create is success",
          });
        });
        resolve({
          results: "please payment",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const handleGetListOrderItem = async (order_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!order_id) resolve("order_id is not null");
      const res = await db.OrderItem.findAll({
        where: {
          order_id: order_id,
        },
        include: [
          {
            model: db.Product,
            as: "productOrder",
            attributes: ["imgPath", "name", "price"],
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt", "order_id"] },

        subQuery: false,
        raw: true,
        nest: true,
      });
      if (res && res.length > 0) {
        resolve({
          results: res,
        });
      }
      resolve({
        results: [],
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const handlePaymentZaloPay = async (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        app_id: process.env.APP_ID,
        key1: process.env.KEY1,
        key2: process.env.KEY2,
        endpoint: process.env.END_POINT,
      };

      const embed_data = {
        redirecturl: process.env.URL_FE,
        email: payload.email,
        address: payload.address,
        payment_id: payload.payment_id,
        point: `${payload.point} `,
      };
      const transID = Math.floor(Math.random() * 1000000);
      const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: payload.user_id,
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(payload.listItem),
        embed_data: JSON.stringify(embed_data),
        amount: payload.total,
        description: `TopWeb - Thanh toán hóa đơn #${transID}`,
        callback_url: "192.168.1.122/callback",
      };

      // appid|app_trans_id|appuser|amount|apptime|embeddata|item
      const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
      const res = await axios.post(config.endpoint, null, { params: order });
      if (res && res.data && Object.keys(res.data).length > 0) {
        resolve({ results: res.data });
      }
      resolve("Lỗi thanh toán");
    } catch (e) {
      reject(e);
    }
  });
};

export const handleCallbackPayment = (data, dataMac) => {
  return new Promise(async (resolve, reject) => {
    // let result = {};
    const config = {
      key2: process.env.KEY2,
    };

    try {
      let mac = CryptoJS.HmacSHA256(data, config.key2).toString();

      if (dataMac !== mac) {
        // callback không hợp lệ
        resolve("mac not equal");
      } else {
        let dataJson = JSON.parse(data, config.key2);
        const payload = {
          user_id: dataJson.app_user,
          total: dataJson.amount,
          status: "done",
          payment_id: JSON.parse(dataJson.embed_data).payment_id,
          listItem: JSON.parse(dataJson.item),
          email: JSON.parse(dataJson.embed_data).email,
          address: JSON.parse(dataJson.embed_data).address,
          point: +JSON.parse(dataJson.embed_data).point,
        };
        const mailOption = {
          subject: "Payment Link",
          message: mailPaymentTemplate(
            `${process.env.FRONTEND_URL}/lich-su-mua-hang`
          ),
        };
        const result = handleCreateOrder(payload, mailOption);
        if (result && result.results) {
          resolve({ result: "SUCCESS" });
        }
        resolve("FAIL");
      }
    } catch (ex) {
      reject(ex);
    }
  });
};
