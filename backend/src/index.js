import express from "express";
import connectDB from "./database/dbconnect.js";
import dotenv from "dotenv";
const app = express();
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB();

app.get("/", (req, res) => {
  res.send("this is thread app ");
});

app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
