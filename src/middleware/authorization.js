import verifyToken from "./verifyToken";
export const Authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json("You are not logged in");
  } else {
    const decode = verifyToken(token);
    if (!decode) {
      return res.status(400).json("token is invalid");
    } else {
      next();
    }
  }
};
