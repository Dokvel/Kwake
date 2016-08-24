import * as UserController from '../controllers/user.controller';

export default function (router, protectedMiddleware) {
  router.put('/profile', protectedMiddleware, UserController.setupProfile);

  if (process.env.DEMO_MODE) {
    router.route('/drop_all').get(UserController.dropAll);
  }
  return router;
};
