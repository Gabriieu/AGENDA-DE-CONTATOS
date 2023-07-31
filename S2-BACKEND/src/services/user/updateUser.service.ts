import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../error";
import { tUserResponse, tUserUpdate } from "../../interfaces/user.interface";
import { userSchemaResponse } from "../../schemas/user.schema";
import {hashSync} from "bcryptjs"

export const updateUserService = async (userId: number, payload: tUserUpdate): Promise<tUserResponse> => {
    const userRepository = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({id: userId})

    if(!user){
        throw new AppError("User not found", 404)
    }

    if(payload.password){
        payload.password = hashSync(payload.password, 10)
    }
    
    const newUserData = userRepository.create({
        ...user,
        ...payload
    })

    await userRepository.save(newUserData)

    return userSchemaResponse.parse(newUserData)
}