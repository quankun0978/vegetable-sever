import db from "../models";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

export const handleGetListMyVoucher = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!user_id) {
        resolve("User id does not exist");
      }
      const res = await db.Code.findAll({
        where: {
          UserUserId: user_id,
        },
        include: [
          {
            model: db.Voucher,
          },
        ],

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
export const handleGetListVoucher = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Voucher.findAll({
        subQuery: false,
        raw: true,
        nest: true,
        attributes: ["voucher_id", "discount", "point"],
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

export const handleAddMyVoucher = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheck = true;
      const fields = ["user_id", "voucher_id"];
      fields.forEach((item) => {
        if (!data[item]) {
          resolve(`${item} is not null`);
          isCheck = false;
        }
      });
      if (isCheck) {
        const res = await db.Code.create({
          UserUserId: data.user_id,
          VoucherVoucherId: data.Voucher_id,
          code_id: uuidv4(),
        });
        if (!res) {
          resolve("create is fail");
        }
        resolve({
          results: "create is success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const handleDeleteMyVoucher = async (code_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!code_id) {
        resolve("Code Id is not null");
      } else {
        const res = await db.Code.destroy({
          where: {
            code_id: code_id,
          },
        });
        if (res !== 1) {
          resolve("Code is not essits");
        }
        resolve({
          results: "delete is success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
