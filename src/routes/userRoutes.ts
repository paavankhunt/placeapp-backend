import express from 'express';
import { login, logout, signUp } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

export default router;
