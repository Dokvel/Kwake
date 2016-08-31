import * as UserController from '../controllers/user.controller';
import * as EvaluateController from '../controllers/evaluate.controller';

export default function (router, protectedMiddleware) {
  router.put('/profile', protectedMiddleware, UserController.setupProfile);

  router.get('/users/me', protectedMiddleware, UserController.getCurrentUser);

  router.get('/users/:cuid', UserController.getUser);

  router.get('/users/:user_cuid/evaluates', EvaluateController.getEvaluates);

  router.get('/users/:user_cuid/encounters', protectedMiddleware, UserController.getEncounters);

  if (process.env.DEMO_MODE) {
    router.route('/drop_all').get(UserController.dropAll);
  }
  return router;
};
