import { Request, Response } from 'express';
import { ResponseMessageKey } from '../../constants/responses';
import { sendErrorResponse, sendSuccessResponse } from '../../helpers/responseHelper';
import {
  signinUser,
  signupUser,
} from '../../services/authService';

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await signinUser(email, password);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Login', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Login', 'LOGIN', result);
  } catch (error: unknown) {
    return sendErrorResponse(req, res, 'Login', 'GENERIC', error instanceof Error ? error : undefined);
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await signupUser(email, password);
    if (typeof result === 'object' && 'error' in result) {
      return sendErrorResponse(req, res, 'Login', result.error as ResponseMessageKey);
    }
    return sendSuccessResponse(req, res, 'Login', 'LOGIN', result);
  } catch (error: unknown) {
    return sendErrorResponse(req, res, 'Login', 'GENERIC', error instanceof Error ? error : undefined);
  }
};

