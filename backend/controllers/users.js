import { userBaseSchema } from '../../schema/users.js';
import { User } from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @route              POST api/users
// @description        Register new user
// @access             Public
export const registerUser = asyncHandler(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    const err = new Error(
      'Please provide your credentials in order to register'
    );
    err.status = 400;
    throw err;
  }

  const validateReqData = userBaseSchema.safeParse(req.body);

  if (!validateReqData.success) {
    console.log(validateReqData.error);
    const err = new Error('Invalid user data');
    err.status = 400;
    throw err;
  }

  const { email, password, name, role } = validateReqData.data;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    const err = new Error('User already exists');
    err.status = 400;
    throw err;
  }

  const newUser = await User.create({ email, password, name, role });

  // Generate accessToken
  const { accessToken } = await newUser.generateToken();

  // Generate refreshToken and set it in httpOnlyCookie
  const { refreshToken } = await newUser.generateToken();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  res.status(201).json({
    success: true,
    accessToken,
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});
