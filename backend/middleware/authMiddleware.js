import JWT_SECRET from '../utils/encodeJWT.js';
import { User } from '../models/User.js';
import * as jose from 'jose';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith('Bearer')) {
    const err = new Error('Not Authorized. No token provided');
    err.status = 401;
    throw err;
  }

  const token = authHeaders.split(' ')[1];

  const { payload } = await jose.jwtVerify(token, JWT_SECRET);

  const user = await User.findById(payload._id);

  if (!user) {
    const err = new Error('No user found');
    err.status = 404;
    throw err;
  }

  req.user = user;
  next();
});

const authRole = asyncHandler(async (req, res, next) => {
  if (!req.user.role.includes('admin')) {
    const err = new Error('This route is only accessible by admins');
    err.status = 401;
    throw err;
  }
  next();
});

export { protect, authRole };
