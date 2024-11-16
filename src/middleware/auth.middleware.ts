import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'];
    if (!authHeader) {
      return res.status(401).send('auth-header introuvable');
    }
    const token = authHeader as string;
    
    try {
      const decodedToken = verify(token, process.env.JWT_SECRET);
      if (decodedToken['id']) { 
        req['userId'] = decodedToken['id'];
        next();
      } else {
        throw new UnauthorizedException("Token invalide!")
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
