import {
  handleAddItemToCart,
  handleDeleteItemToCart,
  handleGetCartByUserId,
  handleGetListCart,
  handleGetListCartItem,
} from "../services/cartService";

export const getListCart = async (req, res) => {
  try {
    const dt = await handleGetListCart();
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
export const getCartByUserId = async (req, res) => {
  try {
    const dt = await handleGetCartByUserId(req.body.user_id);
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const getListCartItem = async (req, res) => {
  try {
    const dt = await handleGetListCartItem(req.body.user_id);
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const dt = await handleAddItemToCart(req.body);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
export const deleteItemToCart = async (req, res) => {
  try {
    const dt = await handleDeleteItemToCart(req.body.product_id);

    if (dt && !dt.results) {
      return res.status(400).json(dt);
    }
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
