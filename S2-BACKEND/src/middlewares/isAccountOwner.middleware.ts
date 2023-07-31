import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";

export const isAccountOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)

    const userId: number = Number(req.params.id)
    const user = await userRepository.findOneBy({id: res.locals.userId})

    if(user?.id !== userId && !user?.isAdmin){
        return res.status(403).json({
            "message": "Insufficient permission"
        })
    }

    return next()
}