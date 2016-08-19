import User from '../models/user';
import cuid from 'cuid';

export function signIn(req, res) {
  if (!req.body.user.givenName || !req.body.user.familyName || !req.body.user.email || !req.body.user.googleId) {
    res.status(403).end();
  }
  const user = new User(req.body.user);
  user.cuid = cuid();

  User.findOne({ email: user.email }).exec((err, existUser) => {
    if (err) {
      res.status(500).send(err);
    }
    if (existUser) {
      res.json({ user: existUser, newRecord: false });
    } else {
      user.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ user: saved, newRecord: true });
      });
    }
  });
}
