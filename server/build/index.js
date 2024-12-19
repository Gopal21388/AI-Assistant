"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _chatRoutes = _interopRequireDefault(require("./routes/chatRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();

// Middleware
app.use(_express["default"].json());
app.use((0, _cors["default"])());

// API Routes
app.use("/api/chat", _chatRoutes["default"]);
app.post("/api/chat", _chatRoutes["default"]);
app.post("/api/chat", _chatRoutes["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on http://localhost:".concat(PORT));
});