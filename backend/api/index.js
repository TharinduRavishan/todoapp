import express from "express";
import { todoRouter } from "./resources/todo";
import { userRouter } from "./resources/user";

export const restRouter = express.Router();

restRouter.use("/todo", todoRouter);
restRouter.use("/user", userRouter);
