import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { tUserRequest, tUserResponse } from "../../interfaces/user.interface";
import { userSchemaResponse } from "../../schemas/user.schema";

export const createUserService = async (payload: tUserRequest): Promise<tUserResponse> => {
    const userRepository = AppDataSource.getRepository(User)

    const user = userRepository.create(payload)

    await userRepository.save(user)

    return userSchemaResponse.parse(user)
}