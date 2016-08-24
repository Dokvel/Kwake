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
    req.user.talents = [...req.body.user.talents];
    req.user.influence = req.body.user.influence;
    req.user.dominance = req.body.user.dominance;
    req.user.steadiness = req.body.user.steadiness;
    req.user.conscientiousness = req.body.user.conscientiousness;

    req.user.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ user: saved });
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
