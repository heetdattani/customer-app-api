// src/services/authService.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { User } from '../models';
import AppDataSource from '../config/ormconfig';
import { getRepository } from 'typeorm';

// Get the User repository
const userRepository = AppDataSource.getRepository(User);

// Sign-in logic
export const signinUser = async (email: string, password: string) => {
  try {
    const user = await userRepository.findOne({
      where: { email }
    });

    if (!user) return { error: 'USER_NOT_FOUND' };

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return { error: 'INVALID_CREDENTIALS' };

    const token = jwt.sign({ id: user.id, email: user.email }, authConfig.secret, {
      expiresIn: '1d', // Using a more readable format
    });

    return {
      id: user.id,
      email: user.email,
      accessToken: token,
    };
  } catch (error) {
    console.log('error :>> ', error);
  }
};

// Sign-up logic
export const signupUser = async (email: string, password: string) => {
  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (user) return { error: 'EMAIL_ALREADY_EXIST' };
    const password_generate = await bcrypt.hash(password, 10); // Use a more reasonable hash round
    await userRepository.insert({
      email, password: password_generate
    });
    return true;
  } catch (error) {
    console.log('error :>> ', error);
  }
};


function generateSecurePassword(arg0: number) {
  throw new Error('Function not implemented.');
}

