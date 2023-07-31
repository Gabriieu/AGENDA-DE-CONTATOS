import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateDataMiddleware = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const newData = schema.parse(req.body)

    req.body = newData

    return next()
}