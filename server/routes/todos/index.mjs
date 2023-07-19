import { Router } from "express";
import { validationMiddleWare } from "../../middleware/index.mjs";
import { AddTodoController } from "../../controller/index.mjs";
import { TodoSchema } from "../../models/index.mjs";

export const TodoRoutes = Router();

TodoRoutes.post("/add", validationMiddleWare(TodoSchema) ,AddTodoController);