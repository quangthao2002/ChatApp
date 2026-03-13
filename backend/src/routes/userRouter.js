import express from "express";
import { getUser, testAuthToken } from "../controllers/userController.js";
// import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get user info
router.get("/me", getUser);
router.get("/test-auth-token", testAuthToken);
export default router;
