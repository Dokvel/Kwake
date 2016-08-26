import * as AuthController from '../controllers/auth.controller';

export default function (router, protectedMiddleware) {
  // Add a new user by google sign in
  router.post('/auth/google/callback', AuthController.signIn);

  return router;
}
