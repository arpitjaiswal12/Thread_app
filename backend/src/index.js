import express from "express";
import connectDB from "./database/dbconnect.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("this is thread app ");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!", err);
  });
