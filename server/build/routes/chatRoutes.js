"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _chatController = require("../controllers/chatController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Configure Multer for file uploads
var upload = (0, _multer["default"])({
  dest: "uploads/"
});
var router = _express["default"].Router();
router.post("/message", _chatController.getAIResponse);
router.post("/upload", upload.single("file"), _chatController.uploadCSV);
router.post("/queryGPT", _chatController.queryGPT);
var _default = exports["default"] = router;