const express = require("express");
const multer = require("multer");
const { getAIResponse, queryGPT, uploadCSV } = require("../controllers/chatController.js");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/message", getAIResponse);
router.post("/upload", upload.single("file"), uploadCSV);
router.post("/queryGPT", queryGPT);

// Correct the export
module.exports = router;

  