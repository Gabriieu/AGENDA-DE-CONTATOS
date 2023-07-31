import {z} from "zod"


export const schema = z.object({
    email: z.string().nonempty("Email obrigatório").email({message: "Formato inválido"}),
    password: z.string().nonempty("Senha obrigatória")
})

export type tLogin = z.infer<typeof schema>