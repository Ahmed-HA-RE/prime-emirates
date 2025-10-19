import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  getMyProfile,
  updateMyProfile,
  UpdateUser,
} from '../controllers/users.js';
import { authRole, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser) // POST api/users
  .get(protect, authRole, getUsers); // GET api/users

router.route('/login').post(loginUser); // POST api/users/login
router.route('/logout').post(logoutUser); // POST api/users/logout
router.route('/refresh').post(refreshToken); // POST api/users/refresh

router.use(protect);
router
  .route('/my-profile')
  .get(getMyProfile) // GET api/users/my-profile
  .put(protect, updateMyProfile); // PUT api/users/my-profile

// For Admins
router.use(protect);
router.use(authRole);
router
  .route('/:userId')
  .get(getUser) // GET api/users/:userId
  .put(UpdateUser) // PUT api/users/:userId
  .delete(deleteUser); // DELETE api/users/:userId

export default router;
