import {
  userBaseSchema,
  userLoginSchema,
  userUpdateInfoSchema,
} from '../../schema/users.js';
import { User } from '../models/User.js';
import asyncHandler from 'express-async-handler';
import * as jose from 'jose';
import JWT_SECRET from '../utils/encodeJWT.js';
import setTokenToCookie from '../utils/setCookie.js';

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

  // Set token in httpOnlyCookie
  setTokenToCookie(res, refreshToken);

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

// @route              POST api/users/login
// @description        Login user
// @access             Public
export const loginUser = asyncHandler(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    const err = new Error('Please provide your credentials in order to login');
    err.status = 400;
    throw err;
  }

  const validateReqData = userLoginSchema.safeParse(req.body);
  if (!validateReqData.success) {
    const err = new Error('Invalid email or password format');
    err.status = 400;
    throw err;
  }

  const { email, password } = validateReqData.data;

  const user = await User.findOne({ email });
  const isPassMatched = await user.isPassMatched(password);

  if (!user || !isPassMatched) {
    const err = new Error('Invalid Credentials');
    err.status = 401;
    throw err;
  }

  // Generate accessToken
  const { accessToken } = await user.generateToken();

  // Generate refreshToken
  const { refreshToken } = await user.generateToken();

  // Set token in httpOnlyCookie
  setTokenToCookie(res, refreshToken);

  res.status(201).json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @route              POST api/users/logout
// @description        Logout user
// @access             Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('refreshToken');
  res.status(201).json({ success: true });
});

// @route              POST api/users/refresh
// @description        Refresh user's expired token
// @access             Private
export const refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    const err = new Error('Not Authorized. No refresh token provided');
    err.status = 401;
    throw err;
  }

  const { payload } = await jose.jwtVerify(refreshToken, JWT_SECRET);

  const user = await User.findById(payload._id);

  if (!user) {
    const err = new Error('No user found');
    err.status = 404;
    throw err;
  }

  // Generate accessToken
  const { accessToken } = await user.generateToken();

  res.status(201).json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @route              GET api/users/my-profile
// @description        Get user's profile data
// @access             Private
export const getMyProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    const err = new Error('No user found');
    err.status = 404;
    throw err;
  }

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @route              PUT api/users/my-profile
// @description        Update user's profile data
// @access             Private
export const updateMyProfile = asyncHandler(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    const err = new Error(
      'Please provide the fields you want to update your account with'
    );
    err.status = 400;
    throw err;
  }

  const user = await User.findById(req.user._id);

  const validateReqData = userUpdateInfoSchema.safeParse(req.body);

  if (!validateReqData.success) {
    const err = new Error('Invalid Data Entered');
    err.status = 400;
    throw err;
  }

  const { email, name, password } = validateReqData.data;

  user.email = email || user.email;
  user.name = name || user.name;

  if (req.body.password) {
    user.password = password || user.password;
  }

  await user.save();

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @route              GET api/users
// @description        Get all users
// @access             Private
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).send('Get all users as an admin role');
});
// @route              GET api/users/:userId
// @description        Get single user
// @access             Private
export const getUser = asyncHandler(async (req, res, next) => {
  res.status(200).send('Get user by his id as an admin role');
});
// @route              PUT api/users/:userId
// @description        Update single user data
// @access             Private
export const UpdateUser = asyncHandler(async (req, res, next) => {
  res.status(200).send('Update user as an admin role');
});
// @route              DELETE api/users/:userId
// @description        Delete users
// @access             Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  res.status(200).send('Delete user as an admin role');
});
