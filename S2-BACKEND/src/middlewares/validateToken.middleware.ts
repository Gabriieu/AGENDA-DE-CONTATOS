import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"


export const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization

    if(!authorization){
        return res.status(401).json({
            message: "Token is missing"
        })
    }
    const token = authorization.split(" ")[1]


    jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if(error){
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        res.locals.userId = decoded.sub

        return next()
    })

}