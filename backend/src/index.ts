import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json()); //body of API req is converted to json so that we don't have to convert it
app.use(express.urlencoded({ extended: true })); //helps to parse URLs
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //it is for security purpose that prevents some URLs from reaching our server

//this will go to the compiled frontend dist folder which has our compiled static frontend assets
//and server those static assets on the route of url that the backend runs on
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(7000, () => {
  console.log("the server is running on port 7000");
});
