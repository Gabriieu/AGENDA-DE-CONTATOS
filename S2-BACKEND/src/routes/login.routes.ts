import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";

export const loginRoute = Router()

loginRoute.post("", loginController)