import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SERECT_KEY);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime || !decoded) {
      // Token đã hết hạn
      return null;
    }

    return decoded;
  } catch (err) {
    // Xử lý lỗi ở đây
  }
};

export default verifyToken;
