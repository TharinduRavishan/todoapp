import express from "express";
import userController from "./user.controller";

export const userRouter = express.Router();

userRouter.route("/").post(userController.createUser);
userRouter.route("/").put(userController.updateUser);
userRouter.route("/").delete(userController.deleteUser);

userRouter.route("/list").get(userController.list);
