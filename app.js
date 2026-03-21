import express from "express";
import { generate } from "./chatbot.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes and origins

app.get("/", (req, res) => {
  res.send("Welcome to chatdpt");
});
app.post("/chat", async (req, res) => {
  const { message, threadId } = req.body;
  // todo validate above field
  if (!message || !threadId) {
    res.status(400).json({ message: "All field are required" });
  }
  console.log(message);
  const result = await generate(message, threadId);
  res.send({ message: result });
});
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
