import express from 'express';
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from '../controllers/users.js';

const router = express.Router();

router.route('/').post(registerUser); // POST api/users
router.route('/login').post(loginUser); // POST api/users/login
router.route('/logout').post(logoutUser); // POST api/users/logout
router.route('/refresh').post(refreshToken); // POST api/users/refresh

export default router;
