import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", userRoute);
app.use("/api", todoRoute);

app.get("/", (req, res) => {
  res.send("API WORKING!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`);
});