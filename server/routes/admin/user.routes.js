import * as UserController from '../../controllers/admin/user.controller';
import passport from 'passport';

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).end();
  }
}

export default function (router) {

  router.post('/login', passport.authenticate('local', { failWithError: true }),
    function (req, res, next) {
      // handle success
      req.login(true, function (err) {
        if (err) return next(err);
        return res.json({ authenticated: true });
      });
    },
    function (err, req, res, next) {
      // handle error
      return res.json({ authenticated: false });
    });

  router.get('/users', ensureLoggedIn, UserController.getUsers);
  router.get('/users/tokens', ensureLoggedIn, UserController.getTokens);

  return router;
};
