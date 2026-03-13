import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "15minutes";
const REFRESH_TOKEN_TTL = 30 * 1000; // 30 g
// const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
// sign up
export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstname, lastname } = req.body;
    if (!username || !password || !email || !firstname || !lastname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = new User({
      username,
      hashedPassword,
      email,
      displayName: `${firstname} ${lastname}`,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    res.status(500).json({ message: error.message });
  }
};
// sign in
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user exists
    const user = await User.findOne({ username }).select("+hashedPassword");
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // generate access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_TTL,
      },
    );
    // generate refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // save refresh token to user document
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // set refresh token in http-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // không cho client JavaScript truy cập
      secure: true, // chỉ gửi cookie qua HTTPS
      sameSite: "none", // client và server khác domain
      maxAge: REFRESH_TOKEN_TTL, // 7 days
    });

    res.status(200).json({
      message: `User ${user.displayName} signed in successfully`,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    await Session.deleteOne({ refreshToken });
    // clear refresh token cookie
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // lấy token tu cooki
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại" });
    }
    // so với token refresh token trong db
    const session = await Session.findOne({ refreshToken: token });

    // không tìm thấy session trong DB
    if (!session) {
      return res
        .status(401)
        .json({ message: "refresh token không hợp lệ hoặc đã hết hạn" });
    }

    // kiểm tra hạn sử dụng refresh token
    if (session.expiresAt && session.expiresAt.getTime() < Date.now()) {
      return res.status(401).json({ message: "refresh token đã hết hạn" });
    }

    // tạo accesstoken mới

    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Lỗi khi gọi refreshToken");
    return res.status(500).json({ message: "lỗi hệ thống" });
  }
};
