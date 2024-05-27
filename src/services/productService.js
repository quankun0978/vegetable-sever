import db from "../models";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

export const handleGetAllProduct = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Product.findAll({
        // include: [
        //   {
        //     model: db.Group,
        //   },
        // ],
        // attributes: { exclude: ["password"] },
        subQuery: false,
        raw: true,
        nest: true,
      });
      if (res && res.length > 0) {
        resolve({
          results: {
            data: res,
          },
        });
      }
      resolve({
        results: {
          data: [],
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const handleGetProductById = async (product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!product_id) {
        resolve("product_id is not null");
      }
      const res = await db.Product.findOne({
        where: {
          product_id,
        },
        subQuery: false,
        raw: true,
        nest: true,
      });
      if (res) {
        resolve({
          results: {
            data: res,
          },
        });
      }
      resolve("Product does not exist");
    } catch (e) {
      reject(e);
    }
  });
};
