import {
  handleAddItemToOrder,
  handleCreateOrder,
  handleGetListOrderItem,
  handleGetOrderByUserId,
} from "../services/orderService";

export const getOrderByUserId = async (req, res) => {
  try {
    const dt = await handleGetOrderByUserId(req.body.user_id);
    // console.log("Cookies: ", req.cookies);
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

// export const getListOrderItem = async (req, res) => {
//   try {
//     const dt = await handleGetOrderByUserId(req.body.user_id);
//     // console.log("Cookies: ", req.cookies);
//     return res.status(200).json(dt);
//   } catch {
//     // return res.status(500).json({ message: "sever is error ", errcode: 500 });
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const dt = await handleCreateOrder(req.body);
    // console.log("Cookies: ", req.cookies);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

export const getListOrderItem = async (req, res) => {
  try {
    const dt = await handleGetListOrderItem(req.body.order_id);
    // console.log("Cookies: ", req.cookies);
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};

// export const addItemToOrder = async (req, res) => {
//   try {
//     const dt = await handleAddItemToOrder(req.body);
//     // console.log("Cookies: ", req.cookies);
//     if (dt && !dt.results) {
//       return res.status(400).json(dt);
//     }
//     return res.status(200).json(dt);
//   } catch {
//     // return res.status(500).json({ message: "sever is error ", errcode: 500 });
//   }
// };
