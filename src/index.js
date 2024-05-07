import express from "express";
import dotenv from "dotenv";
import config from "./config/configDefault";
import { testConnection } from "./config/configSequelize";
dotenv.config();
const app = express();
config(app);
testConnection();
app.get("/", (req, res) => {
  // Cookies that have not been signed

  // Cookies that have been signed

  return res.send("helo");
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
