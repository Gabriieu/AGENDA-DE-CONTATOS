import { z } from "zod";

export const contactSchema = z.object({
    id: z.number(),
    full_name: z.string().max(50, {message: "maximum length of the name field exceeds 50 characters"}).min(3, {message: "minimum length of the name must be 3 characters"}),
    phone: z.string().min(11, {message: "phone number must be: DDD_xxxxxxxxx"}).max(11, {message: "contact number must be: DDDxxxxxxxxx"}),
    email: z.string().email(),
    created_at: z.date()
})

export const contactSchemaRequest = contactSchema.omit({id: true, created_at: true})

export const contactSchemaResponse = contactSchema