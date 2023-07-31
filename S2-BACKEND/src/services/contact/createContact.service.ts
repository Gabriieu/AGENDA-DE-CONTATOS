import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contacts.entitie"
import { User } from "../../entities/user.entitie"
import { AppError } from "../../error"
import { tContactRequest } from "../../interfaces/contact.interface"
import { contactSchemaResponse } from "../../schemas/contact.schema"
import { listContactsService } from "./listContacts.service"

export const createContactService = async (payload: tContactRequest, userId: number) => {
    const userRepository = AppDataSource.getRepository(User)
    const contactRepository = AppDataSource.getRepository(Contact)

    const user = await userRepository.findOne({
        where: {id: userId}
    })

    if(!user){
        throw new AppError("User not found", 404)
    }

    if(user.phone === payload.phone || user.email === payload.email){
        throw new AppError("Você não pode adicionar a si mesmo como contato", 403)
    }

    const userContactList = await listContactsService(user.id)

    if(userContactList.find(contact => contact.email == payload.email)){
        throw new AppError("Você já possui este email em sua lista")
    }

    if(userContactList.find(contact => contact.phone == payload.phone)){
        throw new AppError("Você já possui este número de telefone em sua lista")
    }
    
    const contact = contactRepository.create({
        user: user,
        ...payload
    })

    await contactRepository.save(contact)

    return contactSchemaResponse.parse(contact)
}