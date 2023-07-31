import {z} from "zod"
import { userSchema, userSchemaRequest, userSchemaResponse } from "../schemas/user.schema"
import { DeepPartial } from "typeorm"


export type tUser = z.infer<typeof userSchema>

export type tUserRequest = z.infer<typeof userSchemaRequest>

export type tUserResponse = z.infer<typeof userSchemaResponse>

export type tUserUpdate = DeepPartial<tUserRequest>