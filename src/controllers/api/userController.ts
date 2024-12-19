import { Request, Response } from 'express';
import { sendSuccessResponse } from '../../helpers/responseHelper';

export const userDetail = async (req: Request, res: Response) => {
  return sendSuccessResponse(req, res, 'User', '', req.user);
};
