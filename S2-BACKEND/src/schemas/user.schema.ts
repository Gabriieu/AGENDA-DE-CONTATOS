import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  full_name: z.string().max(80, {message: "maximum length of the name field exceeds 80 characters"}).min(8, {message: "minimum length of the name must be 8 characters"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "minimum length of the password must be 8 characters"}),
  phone: z.string().min(11, {message: "phone number must be: DDD_xxxxxxxxx"}).max(11, {message: "contact number must be: DDDxxxxxxxxx"}),
  isAdmin: z.boolean(),
  created_at: z.date(),
});

export const userSchemaRequest = userSchema.omit({id: true, created_at: true, isAdmin: true})

export const userSchemaResponse = userSchema.omit({password: true})

export const userSchemaUpdate = userSchema.omit({id: true, createdAt: true}).partial()