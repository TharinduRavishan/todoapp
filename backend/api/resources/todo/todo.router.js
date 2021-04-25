import express from "express";
import todoController from "./todo.controller";

export const todoRouter = express.Router();

todoRouter.route("/").post(todoController.createTodo);
todoRouter.route("/").put(todoController.updateTodo);
todoRouter.route("/").delete(todoController.deleteTodo);

todoRouter.route("/list").get(todoController.list);
todoRouter.route("/complete").put(todoController.completeTodo);
