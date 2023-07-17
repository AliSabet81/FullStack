import { Router } from "express";
import { SignInSchema, SignUpSchema, User } from "./../../models/index.mjs";
import { validationMiddleWare } from "../../middleware/index.mjs";
import { SignInUserController, SignUpUserController } from "../../controller/index.mjs";

export const AuthRoutes = Router();

AuthRoutes.post("/sign-up", validationMiddleWare(SignUpSchema),SignUpUserController);
AuthRoutes.post("/sign-in", validationMiddleWare(SignInSchema),SignInUserController);