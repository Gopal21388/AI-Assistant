import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
dotenv.config()
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