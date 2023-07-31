import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entitie";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../error";
import { tContactResponse } from "../../interfaces/contact.interface";

export const listContactsService = async (
  userId: number
): Promise<tContactResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contactList = await contactRepository.createQueryBuilder("contact")
  .where("contact.userId = :user", {user: user.id})
  .getMany()

  return contactList
};
