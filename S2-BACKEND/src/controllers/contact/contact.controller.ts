import { Request, Response } from "express";
import { createContactService } from "../../services/contact/createContact.service";
import { listContactsService } from "../../services/contact/listContacts.service";
import { deleteContactService } from "../../services/contact/deleteContact.service";
import { updateContactService } from "../../services/contact/updateContact.service";

export const createContactController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(res.locals.userId)
    const payload = req.body

    const contact = await createContactService(payload, userId)

    return res.status(201).json(contact)
}

export const listContactsController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(res.locals.userId)
    
    const contacts = await listContactsService(userId)

    return res.json(contacts)
}

export const updateContactController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(res.locals.userId)
    const contactId: number = Number(req.params.id)
    const payload = req.body

    const updatedContact = await updateContactService(userId, contactId, payload)

    return res.json(updatedContact)
}

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {
    const contactId = Number(req.params.id)
    await deleteContactService(contactId)
    return res.status(204).send()
}