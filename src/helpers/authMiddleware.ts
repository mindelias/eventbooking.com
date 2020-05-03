
import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
// import joi from "@hapi/joi";

export function Authenticate(
  req: Request,
  res: Response,
  next:NextFunction
   
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Access denied, provide token',
    });
  }

  jwt.verify(token, 'secretkey', (error: any) => {
    if (error) {
      res.status(400).json({
        error: 'Access denied, token is invalid',
      });
    }
  });
  return next();
}


// import jwt from 'jsonwebtoken';
// import { Request } from 'express';
// export const Authenticate = (req: Request) => {
//   let token: string;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.includes('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   return new Promise((resolve, reject) => {
//     jwt.verify(token, 'secretkey', (error: any, decoded: any) => {
//       if (error) reject('401: User is not authenticated');

//       resolve(decoded);
//     });
//   });
// };
