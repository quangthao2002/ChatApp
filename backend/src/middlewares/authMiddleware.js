import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1]; // lấy token sau "Bearer "
    // verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: "Access token is invalid or expired" });
      }
      // tìm  user
      const user = await User.findById(decoded.userId).select(
        "-hashedPassword",
      );
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user; // gán user vào req để sử dụng ở các route sau
      next();
    });
  } catch (error) {
    console.error("Error in vevrifying access token:", error);

    res.status(401).json({ message: "Unauthorized" });
  }
};
