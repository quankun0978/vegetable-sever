import {
  handleGetAllProduct,
  handleGetProductById,
} from "../services/productService";
export const getAllProduct = async (req, res) => {
  try {
    const dt = await handleGetAllProduct();
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
export const getProductById = async (req, res) => {
  try {
    const dt = await handleGetProductById(req.body.id);
    return res.status(200).json(dt);
  } catch {
    return res.status(500).json("sever is error");
  }
};
