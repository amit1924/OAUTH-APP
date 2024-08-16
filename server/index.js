import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const PORT = process.env.PORT || 5000;

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};

dbConnect();

app.use(express.json());

app.use("/api/auth", authRoutes);
console.log(`auth routes: ${authRoutes}`);

app.get("/", (req, res) => {
  res.send("Hello Worlds");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
