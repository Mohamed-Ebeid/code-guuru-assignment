import express from "express";
import {
  addExp,
  deleteExp,
  getExp,
  singleExp,
  editExp,
  SearchExp,
} from "../Controllers/expenseController.js";
import { isAuth } from "../utils.js";

const expenseRoutes = express.Router();

expenseRoutes.post("/add", isAuth, addExp);
expenseRoutes.post("/edit/:id", isAuth, editExp);
expenseRoutes.delete("/:id", isAuth, deleteExp);
expenseRoutes.get("/get", isAuth, getExp);
expenseRoutes.get("/get/:id", isAuth, singleExp);
expenseRoutes.get("/search", isAuth, SearchExp);

export default expenseRoutes;
