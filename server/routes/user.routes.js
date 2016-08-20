import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

// Add a new Post
router.route('/profile').put(UserController.setupProfile);
if (process.env.DEMO_MODE) {
  router.route('/drop_all').get(UserController.dropAll);
}

export default router;
