import express from "express";
import todoController from "./todo.controller";

export const todoRouter = express.Router();

todoRouter.route("/").post(todoController.createTodo);
todoRouter.route("/").put(todoController.updateTodo);
todoRouter.route("/").delete(todoController.deleteTodo);

todoRouter.route("/all").get(todoController.findTodos);
todoRouter.route("/completed").put(todoController.completedTodos);
