// src/@types/express-useragent.d.ts

import { UserAgent } from 'express-useragent';

declare global {
  namespace Express {
    interface Request {
      useragent?: UserAgent; // Extending Request interface to include useragent
    }
  }
}

export function express(): any {
  throw new Error('Function not implemented.');
}
