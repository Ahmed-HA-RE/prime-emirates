import * as jose from 'jose';
import JWT_SECRECT from './encodeJWT.js';

const alg = 'HS256';

const signToken = async (_id, expiresIn = '30d') => {
  return await new jose.SignJWT({ _id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRECT);
};

export default signToken;
