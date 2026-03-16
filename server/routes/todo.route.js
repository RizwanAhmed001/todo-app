import express from "express";
import { deleteTodo, getTodo, todo, todoComplete, updateTodo } from "../controllers/todo.controller.js";
import { auth } from "../middleware/auth.js";

const todoRoute = express.Router();

todoRoute.post("/todo",auth, todo);
todoRoute.get("/alltodo", auth, getTodo);
todoRoute.delete("/deletetodo/:todoid", auth, deleteTodo);
todoRoute.put("/updatetodo/:todoid", auth, updateTodo);
todoRoute.put("/updatetodocomplete/:todoid", auth, todoComplete )

export default todoRoute;