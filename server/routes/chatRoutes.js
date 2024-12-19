import express from "express";
import multer from "multer";
import { getAIResponse, queryGPT, uploadCSV } from "../controllers/chatController.js";
// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/message", getAIResponse);
router.post("/upload", upload.single("file"), uploadCSV);
router.post("/queryGPT", queryGPT);

export default router;
 