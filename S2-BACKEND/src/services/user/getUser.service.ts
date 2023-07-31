import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../error";
import { tUserResponse } from "../../interfaces/user.interface";
import { userSchemaResponse } from "../../schemas/user.schema";

export const getUserService = async (userId: number): Promise<tUserResponse> => {
    const userRepository = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({id: userId})

    if(!user){
        throw new AppError("User not found", 404)
    }

    return userSchemaResponse.parse(user)
}