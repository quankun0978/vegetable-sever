import createToken from "../middleware/createToken";
import db from "../models";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
export const handleGetAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.findAll({
        subQuery: false,
        raw: true,
        nest: true,
      });

      resolve({
        results: {
          message: "SUCCESS",
          errcode: 0,
          data: res,
        },
      });
    } catch (e) {
      resolve({
        results: {
          message: "FAIL",
          errcode: 1,
          data: [],
        },
      });
      reject(e);
    }
  });
};
export const handleGetUserById = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if ((!data && Object.keys(data).length === 0) || !data.user_id) {
        resolve("user_id is not null");
      }
      const res = await db.User.findOne({
        where: {
          user_id: data.user_id,
        },
        attributes: { exclude: ["password", "refresh_token"] },

        subQuery: false,
        raw: true,
        nest: true,
      });
      if (!res) {
        resolve("User is not essits");
      }

      resolve({
        results: res,
      });
    } catch (e) {
      resolve("Sever is error");
      reject(e);
    }
  });
};

export const handleUpdateUserById = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if ((!data && Object.keys(data).length === 0) || !data.user_id) {
        resolve("user_id is not null");
      }
      const res = await db.User.update(data, {
        where: {
          user_id: data.user_id,
        },
        attributes: { exclude: ["password", "refresh_token"] },

        subQuery: false,
        raw: true,
        nest: true,
      });

      if (res[0] !== 1) {
        resolve("User is not essits");
      }

      resolve({
        results: "Update is success",
      });
    } catch (e) {
      resolve("Sever is error");
      reject(e);
    }
  });
};

export const handleChangePassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fields = ["user_id", "password", "password_new"];
      fields.forEach((item) => {
        if (!data[item]) {
          resolve(`${item} is not null`);
        }
      });

      const user = await db.User.findOne({
        where: {
          user_id: data.user_id,
        },
        attributes: { exclude: ["refresh_token"] },

        subQuery: false,
        raw: true,
        nest: true,
      });

      if (user) {
        if (user.password === data.password) {
          const res = await db.User.update(
            { password: data.password_new },
            {
              where: {
                user_id: data.user_id,
                password: data.password,
              },
              attributes: { exclude: ["password", "refresh_token"] },

              subQuery: false,
              raw: true,
              nest: true,
            }
          );
          if (res[0] !== 1) {
            resolve("Change password is fail");
          }

          resolve({
            results: "Change password is success",
          });
        }
        resolve("password is incorrect");
      }
      resolve("user is not essits");
    } catch (e) {
      resolve("Sever is error");
      reject(e);
    }
  });
};

export const handleResetPassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fields = ["email", "password_new"];
      fields.forEach((item) => {
        if (!data[item]) {
          resolve(`${item} is not null`);
        }
      });

      const res = await db.User.update(
        { password: data.password_new },
        {
          where: {
            email: data.email,
          },
          attributes: { exclude: ["password", "refresh_token"] },

          subQuery: false,
          raw: true,
          nest: true,
        }
      );
      if (res[0] !== 1) {
        resolve("Change password is fail");
      }

      resolve({
        results: "Change password is success",
      });
    } catch (e) {
      resolve("Sever is error");
      reject(e);
    }
  });
};

export const handleLoginUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve("Please fill in your email and password ");
      }

      let user = await db.User.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
        attributes: { exclude: ["password"] },
        raw: true,
        nest: true,
      });

      if (user) {
        let token = createToken({
          user_id: user.user_id,
          name: user.name,
          point: user.point,
        });
        let refresh_token = uuidv4();
        await db.User.update(
          { refresh_token: refresh_token },
          {
            where: {
              user_id: user.user_id,
            },
          }
        );
        resolve({
          results: {
            access_token: token,
            refresh_token: refresh_token,
          },
        });
      } else {
        resolve("email or password is incorrect");
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const handleRegisterUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password || !data.phone) {
        resolve("Email and password and phone is not null ");
      } else {
        const userByEmail = await db.User.findOne({
          attributes: { exclude: ["password"] },
          where: {
            email: data.email,
          },
          raw: true,
          nest: true,
        });
        if (userByEmail) {
          resolve("email is exsist");
        } else {
          const userByPhone = await db.User.findOne({
            attributes: { exclude: ["password"] },
            where: {
              phone: data.phone,
            },
            raw: true,
            nest: true,
          });
          if (userByPhone) {
            resolve("phone is exsist");
          } else {
            await db.User.create({ ...data, user_id: uuidv4(), point: 100 });
            resolve({
              results: {
                status: "success",
              },
            });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const handleRefreshToken = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        if (!data.user_id || !data.refresh_token) {
          resolve("user_id or refresh token is not null ");
        } else {
          const user = await db.User.findOne({
            where: {
              user_id: data.user_id,
              refresh_token: data.refresh_token,
            },
          });
          if (!user) {
            resolve("refresh token is invalid");
          }
          let token = createToken({ user_id: user.user_id, name: user.name });
          let refresh_token = uuidv4();
          await db.User.update(
            { refresh_token: refresh_token },
            {
              where: {
                user_id: user.user_id,
              },
            }
          );
          resolve({
            results: {
              access_token: token,
              refresh_token: refresh_token,
            },
          });
        }
      }
    } catch (e) {}
  });
};

export const handleSendMail = async (option) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!option.email) {
        resolve("Email is not null!");
      }
      const user = await db.User.findOne({
        where: {
          email: option.email,
        },
      });

      if (!user || Object.keys(user).length === 0) {
        resolve("Your are not registered!");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "quankun0978@gmail.com",
          pass: "kihf jegs xrwd momk",
        },
      });
      const mailOption = {
        from: "quankun0978@gmail.com",
        to: option.email,
        subject: option.subject,
        html: option.message,
      };
      await transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          reject(err);
        }
        resolve({
          results: info,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};
