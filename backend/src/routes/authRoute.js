import express from "express";
import { signUp, signIn } from "../controllers/authController.js";

const router = express.Router(); // Create a router instance

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
