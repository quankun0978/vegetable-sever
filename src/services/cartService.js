import db from "../models";

export const handleGetListCart = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Cart.findAll({
        include: [
          {
            model: db.User,
            attributes: ["user_id"],
          },
        ],

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

export const handleGetCartByUserId = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!user_id) {
        resolve("user_id is not null");
      }
      const res = await db.Cart.findOne({
        where: {
          user_id: user_id,
        },
        include: [
          {
            model: db.User,
            attributes: ["user_id"],
          },
        ],
        subQuery: false,
        raw: true,
        nest: true,
      });
      if (!res) {
        resolve("Cart does not exist");
      }
      resolve({
        results: {
          data: res,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const handleGetListCartItem = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!user_id) resolve("user_id is not null");
      const res = await db.CartItem.findAll({
        where: {
          user_id: user_id,
        },
        include: [
          {
            model: db.Product,
            as: "productCart",
            attributes: ["imgPath", "name", "price", "price_sale"],
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt", "user_id"] },

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

export const handleAddItemToCart = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheck = true;
      const fields = ["user_id", "product_id", "quantity", "total"];
      fields.forEach((item) => {
        if (!data[item]) {
          resolve(`${item} is not null`);
          isCheck = false;
        }
      });
      if (isCheck) {
        const cartItem = await db.CartItem.findOne({
          where: {
            product_id: data.product_id,
          },
        });
        if (cartItem) {
          const res = await db.CartItem.update(data, {
            where: {
              product_id: data.product_id,
            },
          });
          if (res && res.length === 0) {
            resolve("CartItem is not essits");
          }

          resolve({
            results: "Update is success",
          });
        } else {
          const res = await db.CartItem.create(data);
          if (!res) {
            resolve("create is fail");
          }
          resolve({
            results: "create is success",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const handleDeleteItemToCart = async (product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!product_id) {
        resolve("product_id is not null");
      } else {
        const res = await db.CartItem.destroy({
          where: {
            product_id: product_id,
          },
        });
        if (res !== 1) {
          resolve("product is not essits");
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
