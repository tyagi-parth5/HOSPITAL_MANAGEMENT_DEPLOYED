import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/send", sendMessage); //anyone can send
router.get("/getall", isAdminAuthenticated, getAllMessages);  //viewed by admin only

export default router;