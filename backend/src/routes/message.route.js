import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// ✅ Get all users (except yourself) for the sidebar
router.get("/users", protectRoute, getUsersForSidebar);

// ✅ Get messages between logged-in user and selected user
router.get("/:id", protectRoute, getMessages);

// ✅ Send a new message
router.post("/send/:id", protectRoute, sendMessage);

export default router;
