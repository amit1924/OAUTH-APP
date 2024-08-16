import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  console.log("Token received:", token);

  try {
    const tokenWithoutBearer = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default verifyToken;
