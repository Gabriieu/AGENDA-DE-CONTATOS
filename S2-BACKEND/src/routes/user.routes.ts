import { Router } from "express";
import { createUserController, deleteUserController, getUserController, updateUserControler } from "../controllers/user/user.controller";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateEmailAndContactMiddleware } from "../middlewares/validateEmailAndContact.middleware";
import { isAccountOwnerMiddleware } from "../middlewares/isAccountOwner.middleware";


export const userRoutes = Router()

userRoutes.post("", validateDataMiddleware(userSchemaRequest), validateEmailAndContactMiddleware, createUserController)
userRoutes.get("/:id", validateTokenMiddleware, isAccountOwnerMiddleware, getUserController)
userRoutes.patch("/:id", validateTokenMiddleware, validateDataMiddleware(userSchemaUpdate), isAccountOwnerMiddleware, validateEmailAndContactMiddleware, updateUserControler)
userRoutes.delete("/:id", validateTokenMiddleware, isAccountOwnerMiddleware, deleteUserController)