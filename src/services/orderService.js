import db from "../models";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

// export const handleGetListOrder = async () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await db.Order.findAll({
//         include: [
//           {
//             model: db.User,
//             attributes: ["user_id"],
//           },
//         ],

//         subQuery: false,
//         raw: true,
//         nest: true,
//       });
//       if (res && res.length > 0) {
//         resolve({
//           results: {
//             data: res,
//           },
//         });
//       }
//       resolve({
//         results: {
//           data: [],
//         },
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

export const handleGetOrderByUserId = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!user_id) {
        resolve("user_id is not null");
      }
      const res = await db.Order.findAll({
        where: {
          UserUserId: user_id,
        },
        // include: [
        //   {
        //     model: db.CartItem,
        //   },
        // ],
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
      console.log(e);
      reject(e);
    }
  });
};

// export const handleGetListCartItem = async (user_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!user_id) resolve("user_id is not null");
//       const res = await db.CartItem.findAll({
//         where: {
//           UserUserId: user_id,
//         },
//         include: [
//           {
//             model: db.Product,
//             attributes: ["imgPath", "name", "price"],
//           },
//         ],
//         attributes: { exclude: ["updatedAt", "createdAt", "UserUserId"] },

//         subQuery: false,
//         raw: true,
//         nest: true,
//       });
//       if (res && res.length > 0) {
//         resolve({
//           results: res,
//         });
//       }
//       resolve({
//         results: [],
//       });
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
// };

export const handleCreateOrder = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheck = true;
      const fields = ["user_id", "total", "status", "payment_id", "listItem"];
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
          UserUserId: data.user_id,
          order_id: uuidv4(),
        });
        if (!res) {
          resolve("create is fail");
        }
        const dt = data.listItem.map((item) => {
          return {
            ...item,
            ProductProductId: item.product_id,
            OrderOrderId: res.order_id,
          };
        });
        console.log(dt);
        const result = await db.OrderItem.bulkCreate(dt);

        if (result && result.length === 0) {
          resolve("create is fail");
        }
        const resultDelete = await db.CartItem.destroy({
          where: {
            UserUserId: data.user_id,
          },
        });
        console.log(resultDelete);
        if (resultDelete < 1) {
          resolve("create is fail");
        }
        resolve({
          results: "create is success",
        });
      }
    } catch (e) {
      console.log(e);
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
          OrderOrderId: order_id,
        },
        include: [
          {
            model: db.Product,
            attributes: ["imgPath", "name", "price"],
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt", "OrderOrderId"] },

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

// export const handleAddItemToOrder = async (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (
//         !data ||
//         (data && data.length === 0) ||
//         (data && Object.keys(data).length === 0)
//       ) {
//         resolve("data is not null");
//       } else {
//         const dt =
//           data &&
//           data.length > 0 &&
//           data.map((item) => {
//             return {
//               ...item,
//               ProductProductId: item.product_id,
//               OrderOrderId: item.order_id,
//             };
//           });
//         const res = await db.OrderItem.bulkCreate(dt);
//         if (res && res.length > 0) {
//           resolve({
//             results: "Add is success",
//           });
//         }
//         resolve("Add is fail");
//       }
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
// };
