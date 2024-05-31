import {
  handleCreateOrder,
  handleGetListOrderItem,
  handleGetOrderByUserId,
  handlePaymentZaloPay,
} from "../services/orderService";
import { handleCallbackPayment } from "../services/orderService";
import { mailPaymentTemplate } from "../ultils/helper";

export const getOrderByUserId = async (req, res) => {
  try {
    const dt = await handleGetOrderByUserId(req.body.user_id);
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const createOrder = async (req, res) => {
  try {
    const mailOption = {
      subject: "Payment Link",
      message: mailPaymentTemplate(
        `${process.env.FRONTEND_URL}/lich-su-mua-hang`
      ),
    };
    const dt = await handleCreateOrder(req.body, mailOption);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const getListOrderItem = async (req, res) => {
  try {
    const dt = await handleGetListOrderItem(req.body.order_id);
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const paymentZaloPay = async (req, res) => {
  try {
    const dt = await handlePaymentZaloPay(req.body);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const callbackPayment = async (req, res) => {
  try {
    const dt = await handleCallbackPayment(req.body.data, req.body.mac);
    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
