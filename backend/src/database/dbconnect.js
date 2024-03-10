import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {
  try {
    const connectioInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}`
    );
    console.log(
      `Database connection sucessful : ${connectioInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error :", error);
    process.exit(1);
  }
}; // this function is return promise so we can use .then().cath() method also

export default connectDB;
