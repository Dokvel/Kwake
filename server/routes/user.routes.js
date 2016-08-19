import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

// Add a new Post
router.route('/profile').put(UserController.setupProfile);

export default router;
