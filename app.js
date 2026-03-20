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
  const { message } = req.body;
  console.log(message);
  const result = await generate(message);
  res.send({ message: result });
});
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
