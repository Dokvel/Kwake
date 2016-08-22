import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();
import passport from 'passport';

// Add a new user by google sign in
router.post('/auth/google/callback', AuthController.signIn);

export default router;
