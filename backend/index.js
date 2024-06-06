import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "../backend/route/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

//database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Mongodb data base connected");
  } catch (error) {
    console.log("mongodb databse is connection failed", error);
  }
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectDB();
  console.log(`App is runnig on the PORT ${port}`);
});
