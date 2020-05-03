import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
 

type payload = {
  id: string;
  email: string;
};
// type param = {
//     token: string;
//     cb: () => void;
// }
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

export const generateToken = (payload: payload) =>
  jwt.sign(payload, secret, { expiresIn: 86400 });

export function decodeToken(token: any) {
  const decoded = decode(token)
  return decoded
}


//  export const verify = (token:string, cb: ()=>void) => jwt.verify(token, secret, cb);
