import { pool } from "../../config/db";
import express, { Request, Response } from "express";
import {todoController}  from "../todo/todo.controller";
import e from "express";

const router = express.Router();

// toto route for creating todo for specific user
router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getSingleTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export const todoRoutes = router;