import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";

export const validateEmailAndContactMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    const userId = Number(res.locals.userId)
    let user: User | null = null
    const {email, phone} = req.body

    if(userId){
        user = await userRepository.findOneBy({
            id: userId
        })
    }

    const foundEmail: User | null = await userRepository.findOneBy({email: email})

    const foundContact: User | null = await userRepository.findOneBy({phone: phone})

    if(foundEmail?.email === email && foundEmail?.email !== user?.email){
        return res.status(409).json({
            "message": "Este email já está registrado"
        })
    }
    
    if(foundContact?.phone === phone && foundContact?.phone !== user?.phone){
        return res.status(409).json({
            "message": "Este número de telefone já está registrado"
        })
    }

    return next()
}