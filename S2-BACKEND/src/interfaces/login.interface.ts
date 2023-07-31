import { z } from "zod";
import { loginSchema, loginSchemaResponse } from "../schemas/login.schema";

export type tLogin = z.infer<typeof loginSchema>

export type tLoginResponse = z.infer<typeof loginSchemaResponse>