const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes.js");
dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors()); 
 
// API Routes
app.use("/api/chat", chatRoutes);
app.post("/api/chat", chatRoutes);
app.post("/api/chat", chatRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});