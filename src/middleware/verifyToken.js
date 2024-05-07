import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SERECT_KEY);
    return decoded;
  } catch (err) {}
};
export default verifyToken;
