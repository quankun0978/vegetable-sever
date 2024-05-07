import express from "express";
import {
  getAllUser,
  loginUser,
  refreshTokenUser,
  registerUser,
  changePassword,
  getUserById,
  updateUserById,
} from "../controller/userController";
1;
import { getAllProduct, getProductById } from "../controller/productController";
import { Authorization } from "../middleware/authorization";
import {
  addItemToCart,
  deleteItemToCart,
  getCartByUserId,
  getListCart,
  getListCartItem,
} from "../controller/cartController";
import {
  addItemToOrder,
  createOrder,
  getListOrderItem,
  getOrderByUserId,
} from "../controller/orderController";
const router = express.Router();
// user
router.get("/users", getAllUser);
router.post("/user/detail", Authorization, getUserById);
router.post("/user/update", Authorization, updateUserById);
router.post("/user/change_password", Authorization, changePassword);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/refresh_token", refreshTokenUser);

//product
router.get("/product/list", getAllProduct);
router.post("/product/detail", getProductById);

//cart
router.get("/cart/list", Authorization, getListCart);
router.get("/cart/detail", Authorization, getCartByUserId);
router.post("/cart/item/list", Authorization, getListCartItem);
router.post("/cart/item/add", Authorization, addItemToCart);
router.post("/cart/item/delete", Authorization, deleteItemToCart);

//order
router.post("/order/list", Authorization, getOrderByUserId);
router.post("/order/create", Authorization, createOrder);
router.post("/order/item/list", Authorization, getListOrderItem);
// router.post("/order/item/add", Authorization, addItemToOrder);

export default router;
