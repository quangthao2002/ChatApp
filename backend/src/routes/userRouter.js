import express from "express";
import { getUser } from "../controllers/userController.js";
// import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get user info
router.get("/me", getUser);
export default router;
