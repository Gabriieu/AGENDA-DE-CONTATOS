import { z } from "zod";
import { contactSchema, contactSchemaRequest, contactSchemaResponse } from "../schemas/contact.schema";

export type tContact = z.infer<typeof contactSchema>

export type tContactRequest = z.infer<typeof contactSchemaRequest>

export type tContactResponse = z.infer<typeof contactSchemaResponse>