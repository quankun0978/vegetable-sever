import db from "../models";
export const handleGetCommentByProductId = async (product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!product_id) resolve("Product id is not null");
      const res = await db.Comment.findAll({
        where: {
          ProductProductId: product_id,
        },
        include: [
          {
            model: db.User,
            attributes: ["name"],
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt"] },

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
      console.log(e);
      reject(e);
    }
  });
};

export const handlePostComment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheck = true;
      const fields = ["user_id", "product_id", "content", "rate"];
      fields.forEach((item) => {
        if (!data[item]) {
          resolve(`${item} is not null`);
          isCheck = false;
        }
      });
      if (isCheck) {
        const res = await db.Comment.create({
          ...data,
          ProductProductId: data.product_id,
          UserUserId: data.user_id,
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
