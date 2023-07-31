import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entitie"
import { AppError } from "../../error"

export const deleteUserService = async (userId: number): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({id: userId})

    if(!user){
        throw new AppError("User not found", 404)
    }

    await userRepository.remove(user)

}