import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entitie";
import { User } from "../entities/user.entitie";

export const isContactOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepository = AppDataSource.getRepository(Contact)
    const userRepository = AppDataSource.getRepository(User)

    const contactId = Number(req.params.id)

    const contact: Contact | null = await contactRepository.findOne({
        where: {
            id: contactId
        },
        relations: ["user"]
    }) 

    const user: User | null = await userRepository.findOneBy({
        id: Number(res.locals.userId)
    })

    if(contact?.user.id !== user?.id){
        return res.status(403).json({
            "message": "Insufficient permission"
        })
    }

    return next()
}