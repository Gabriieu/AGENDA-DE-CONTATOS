import { Router } from "express";
import { createContactController, deleteContactController, listContactsController, updateContactController } from "../controllers/contact/contact.controller";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { isContactOwnerMiddleware } from "../middlewares/isContactOwner.middleware";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { contactSchemaRequest } from "../schemas/contact.schema";

export const contactRoutes = Router()

contactRoutes.post("", validateTokenMiddleware, validateDataMiddleware(contactSchemaRequest), createContactController)
contactRoutes.get("", validateTokenMiddleware, listContactsController)
contactRoutes.delete("/:id", validateTokenMiddleware, isContactOwnerMiddleware, deleteContactController)
contactRoutes.patch("/:id", validateTokenMiddleware, validateDataMiddleware(contactSchemaRequest), isContactOwnerMiddleware, updateContactController)