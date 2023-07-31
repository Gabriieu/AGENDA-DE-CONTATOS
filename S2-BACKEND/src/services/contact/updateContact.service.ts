import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entitie";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../error";
import { tContactRequest, tContactResponse } from "../../interfaces/contact.interface";
import { contactSchemaResponse } from "../../schemas/contact.schema";

export const updateContactService = async (userId: number, contactId: number, payload: tContactRequest): Promise<tContactResponse> => {
    const userRepository = AppDataSource.getRepository(User)
    const contactRepository = AppDataSource.getRepository(Contact)

    const user = await userRepository.findOneBy({
        id: userId
    })

    if(!user){
        throw new AppError("User not found", 404)
    }

    const contact = await contactRepository.findOneBy({
        id: contactId
    })

    if(!contact){
        throw new AppError("Contact not found", 404)
    }
    
    const updatedContact = contactRepository.create({
        ...contact,
        ...payload
    })

    await contactRepository.save(updatedContact)

    return contactSchemaResponse.parse(updatedContact)
}