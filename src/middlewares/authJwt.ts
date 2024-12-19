import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { sendErrorResponse } from '../helpers/responseHelper';

interface AdminRequest extends Request {
  userId?: string;
  user?: object
}

const authJwt = (req: AdminRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendErrorResponse(req, res, 'AuthJwt-Middleware', 'UNAUTHORIZED', undefined, null, 401);
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return sendErrorResponse(req, res, 'AuthJwt-Middleware', 'UNAUTHORIZED', err, null, 401);
    }
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      req.userId = decoded.id;
      req.user = decoded;
    }
    next();
  });
};

export default authJwt;
