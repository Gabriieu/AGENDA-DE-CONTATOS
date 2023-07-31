import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contacts.entitie"

export const deleteContactService = async (contactId: number): Promise<void> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.find({
        where: {
            id: contactId
        }
    })

    await contactRepository.remove(contact)
}