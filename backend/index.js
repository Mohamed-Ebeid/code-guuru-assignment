import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import expenseRoutes from "./Routes/expenseRoutes.js";

const app = express();
dotenv.config();
app.use(cors());

//db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));

//Welcome api
app.get("/api", (req, res) => {
  res.json("Welcome to the Backend API");
});

//End points
app.use("/api/user", userRoutes);
app.use("/api/expense", expenseRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000"),
);
