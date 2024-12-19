import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      startTime?: number;
      userId?: string;
      user?: object;
    }
  }
}
