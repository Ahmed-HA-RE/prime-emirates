import express from 'express';
import { registerUser } from '../controllers/users.js';

const router = express.Router();

router.route('/').post(registerUser); // POST api/users

export default router;
