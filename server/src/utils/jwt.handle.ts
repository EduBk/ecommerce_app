import { sign, verify } from 'jsonwebtoken'
import { config } from '../config/env'

const generateToken = (payload: any) => {
  const key = config.keySecret
  const data = JSON.parse(payload)
  const jwt = sign(data, key, {
    expiresIn: '24h'
  })

  return jwt
}

const verifyToken = (jwt: string) => {
  const key = config.keySecret
  const isVerified = verify(jwt, key)
  return isVerified
}

export { generateToken, verifyToken }


// import { sign, verify, JwtPayload } from 'jsonwebtoken';
// import { config } from '../config/env';

// interface TokenPayload {
//   // Define la estructura de tu payload aquí
//   userId: string;
//   // Otros campos según sea necesario
// }

// const generateToken = (payload: TokenPayload): string => {
//   const key = config.keySecret;
//   if (!key) {
//     throw new Error('JWT secret key is not defined');
//   }
  
//   return sign(payload, key, {
//     expiresIn: '24h'
//   });
// };

// const verifyToken = (token: string): JwtPayload | string => {
//   const key = config.keySecret;
//   if (!key) {
//     throw new Error('JWT secret key is not defined');
//   }
  
//   try {
//     return verify(token, key);
//   } catch (error) {
//     throw new Error('Invalid token');
//   }
// };

// export { generateToken, verifyToken };