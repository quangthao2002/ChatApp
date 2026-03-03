// initialize server, mongoose and express
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // parse JSON request body
app.use(cookieParser());
app.use(cors()); // allow requests from client

// public router
app.use("/api/auth", authRouter);

// private router
app.use(protectedRoute); // middleware to protect routes
app.use("/api/user", userRouter);

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
