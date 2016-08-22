import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

import passport from 'passport';

// Add a new Post
router.put('/profile', /*passport.authenticate('bearer', { session: false }),*/ UserController.setupProfile);

if (process.env.DEMO_MODE) {
  router.route('/drop_all').get(UserController.dropAll);
}

export default router;
