import jwt from "jsonwebtoken";

const isAunthenicated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthenticated", success: false });
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ message: "Unauthenticated Invaild", success: false });
    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
};

export default isAunthenicated;