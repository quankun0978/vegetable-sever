import {
  handleGetAllProduct,
  handleGetProductById,
} from "../services/productService";
export const getAllProduct = async (req, res) => {
  try {
    const dt = await handleGetAllProduct();
    // console.log("Cookies: ", req.cookies);
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};
export const getProductById = async (req, res) => {
  try {
    const dt = await handleGetProductById(req.body.id);
    // console.log("Cookies: ", req.cookies);
    return res.status(200).json(dt);
  } catch {
    // return res.status(500).json({ message: "sever is error ", errcode: 500 });
  }
};
