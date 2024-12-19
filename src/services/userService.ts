import { User } from "../models";
import bcrypt from 'bcryptjs';
import AppDataSource from '../config/ormconfig'; // Import your data source

export const userDetails = async (
  id: number,
) => {
  // Get the user repository from the data source
  const userRepository = AppDataSource.getRepository(User);

  // Find the user by ID
  const userFound = await userRepository.findOne({
    where: { id },
  });
  if (!userFound) return { error: 'USER_NOT_FOUND' };

  return userFound;
};
