import * as UserController from '../controllers/user.controller';

export default function (router, protectedMiddleware) {
  router.put('/profile', protectedMiddleware, UserController.setupProfile);

  router.get('/users/me', protectedMiddleware, UserController.getCurrentUser);
  router.get('/users/:cuid', UserController.getUser);

  if (process.env.DEMO_MODE) {
    router.route('/drop_all').get(UserController.dropAll);
  }
  return router;
};
