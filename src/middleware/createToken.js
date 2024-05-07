import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createToken = (data) => {
  try {
    let token = jwt.sign(data, process.env.SERECT_KEY, {
      expiresIn: process.env.EXPIRESIN,
    });
    return token;
  } catch (e) {}
};
export default createToken;
