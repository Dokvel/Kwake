import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Add a new user by google sign in
router.route('/signin').post(AuthController.signIn);

export default router;
