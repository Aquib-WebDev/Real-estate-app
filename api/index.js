import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from  "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log("Server is running on port " + port + "!!!");
});

app.use('/api/auth',authRouter);

app.use('/api/user', userRouter);
