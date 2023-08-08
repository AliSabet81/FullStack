import { Router } from "express";
import { validateUser, validationMiddleWare } from "../../middleware/index.mjs";
import {
  AddTodoController,
  DeleteTodoController,
  GetTodoByIdController,
  GetTodoController,
  UpdateTodoController,
} from "../../controller/index.mjs";
import { TodoSchema } from "../../models/index.mjs";

export const TodoRoutes = Router();

TodoRoutes.post("/add", validationMiddleWare(TodoSchema), AddTodoController);
TodoRoutes.get("/", validateUser, GetTodoController);
TodoRoutes.get("/:id", validateUser, GetTodoByIdController);
TodoRoutes.put("/update/:id", validateUser, UpdateTodoController);
TodoRoutes.delete("/delete/:id", validateUser, DeleteTodoController);