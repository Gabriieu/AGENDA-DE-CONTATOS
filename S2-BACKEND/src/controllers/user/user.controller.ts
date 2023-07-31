import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";
import { getUserService } from "../../services/user/getUser.service";
import { updateUserService } from "../../services/user/updateUser.service";
import { deleteUserService } from "../../services/user/deleteUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const data = req.body
    const user = await createUserService(data)

    return res.status(201).json(user)
}

export const getUserController = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.id)
    const user = await getUserService(userId)

    return res.json(user)
}

export const updateUserControler = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(req.params.id)
    const data = req.body

    const newUserData = await updateUserService(userId, data)

    return res.json(newUserData)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(req.params.id)
    await deleteUserService(userId)
    return res.status(204).send()
}