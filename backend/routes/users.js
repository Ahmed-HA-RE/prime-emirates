import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  UpdateUser,
} from '../controllers/users.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser) // POST api/users
  .get(getUsers); // GET api/users

router.route('/login').post(loginUser); // POST api/users/login
router.route('/logout').post(logoutUser); // POST api/users/logout
router.route('/refresh').post(refreshToken); // POST api/users/refresh

router
  .route('/:userId')
  .get(getUser) // GET api/users/:userId
  .put(UpdateUser) // PUT api/users/:userId
  .delete(deleteUser); // DELETE api/users/:userId

export default router;
