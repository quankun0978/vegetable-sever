import express from "express";
import {
  getAllUser,
  loginUser,
  refreshTokenUser,
  registerUser,
  changePassword,
  getUserById,
  updateUserById,
  sendMail,
  resetPassword,
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
  callbackPayment,
  createOrder,
  getListOrderItem,
  getOrderByUserId,
  paymentZaloPay,
} from "../controller/orderController";
import {
  addMyVoucher,
  deleteMyVoucher,
  getListMyVoucher,
  getListVoucher,
} from "../controller/voucherController";
import {
  getCommentByProductId,
  postComment,
} from "../controller/commentController";
import { getDataAllCode } from "../controller/allcodeController";
import {
  addNews,
  getListNews,
  getListNewsById,
} from "../controller/newsController";

// import { handleAddNews } from "../services/newsService";
const router = express.Router();
// user
router.get("/users", getAllUser);
router.post("/user/detail", Authorization, getUserById);
router.post("/user/update", Authorization, updateUserById);
router.post("/user/change_password", Authorization, changePassword);
router.post("/user/send_mail", sendMail);
router.post("/user/reset_password", resetPassword);

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
router.post("/order/payment/zalopay", Authorization, paymentZaloPay);
router.post("/callback", callbackPayment);

// voucher
router.get("/voucher/list", getListVoucher);
router.post("/voucher/item/list", Authorization, getListMyVoucher);
router.post("/voucher/item/add", Authorization, addMyVoucher);
router.post("/voucher/item/delete", Authorization, deleteMyVoucher);

//comment
router.post("/comment/item/list", getCommentByProductId);
router.post("/comment/item/add", Authorization, postComment);

//allcode
router.get("/allcode/list", getDataAllCode);

//news
router.get("/news/list", getListNews);
router.post("/news/list/detail", getListNewsById);

router.post("/news/add", addNews);

export default router;
