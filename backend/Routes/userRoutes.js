import express from "express";
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  // test,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/sign-in", signIn);
userRouter.post("/register", signUp);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
// userRouter.post("/test", test);

export default userRouter;
