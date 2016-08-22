import User from '../models/user';

export function setupProfile(req, res) {
  if (!req.body.user.email
    || !req.body.user.talents
    || req.body.user.dominance === undefined
    || req.body.user.influence === undefined
    || req.body.user.steadiness === undefined
    || req.body.user.conscientiousness === undefined) {
    res.status(403).end();
  } else {
    User.findOne({ email: req.body.user.email }).exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {

        if (user) {
          user.talents = [...req.body.user.talents];
          user.influence = req.body.user.influence;
          user.dominance = req.body.user.dominance;
          user.steadiness = req.body.user.steadiness;
          user.conscientiousness = req.body.user.conscientiousness;

          user.save((err, saved) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json({ user: saved });
            }
          });
        }
      }
    });
  }
}

export function dropAll(req, res) {
  User.remove({}).exec((err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect('/');
      }
    }
  );
}
