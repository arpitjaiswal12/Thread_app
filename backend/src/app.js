import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import { cloudinaryConnect } from "./database/cloudinaryconnect.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json()); 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// app.use(express.urlencoded({ extended: true, limit: "16kb" })); // extended is use for object within object
// app.use(express.static("public"));
app.use(cookieParser());

cloudinaryConnect();

import userRouter from "./routes/user.routes.js"
import threadRouter from "./routes/thread.routes.js"
import commentRouter from "./routes/comment.routes.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/thread",threadRouter)
app.use("/api/v1/comment",commentRouter)

export { app };
