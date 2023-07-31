import { Request, Response } from "express";
import { loginService } from "../../services/login/login.service";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body
    const token = await loginService(payload)
    return res.json(token)
}