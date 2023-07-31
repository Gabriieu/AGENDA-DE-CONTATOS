import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../error";
import { tLogin, tLoginResponse } from "../../interfaces/login.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const loginService = async (
  payload: tLogin
): Promise<tLoginResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: payload.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  const passwordMatch = await compare(payload.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign({
    user: user.full_name
    },
    process.env.SECRET_KEY!,
    {
        expiresIn: "7d",
        subject: user.id.toString()
    }
)

  return {token}
};
