import express from "express";
import dotenv from "dotenv";
import config from "./config/configDefault";

import { callbackPayment } from "./controller/orderController";
dotenv.config();
const app = express();

config(app);

app.post("/callback", callbackPayment);

app.listen(process.env.PORT || 8081, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
