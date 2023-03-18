import express from 'express';
import { loginUser, signupUser } from '../controllers/user.controller.js';

const router = express.Router();

// login route
router.route('/login').post(loginUser);

// signup route
router.route('/signup').post(signupUser);

export default router;