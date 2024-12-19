import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendErrorResponse } from '../helpers/responseHelper';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return sendErrorResponse(req, res, 'Validation Request', firstError.msg);
  }
  next();
};
