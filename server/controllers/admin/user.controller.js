import User, { publicUserParams } from '../../models/user';
import Evaluate from '../../models/evaluate';
import Token from '../../models/token';

export function getUsers(req, res) {
  User.find().then((users) => {
    res.json({ users: publicUserParams(users) });
  }).catch((err) => {
    res.status(500).send(err);
  });
}

export function getTokens(req, res) {
  Token.find().then((tokens)=> {
    res.json({ tokens });
  }).catch((err) => {
    res.status(500).send(err);
  });
}
export function resetProfileUser(req, res) {
  if (!req.params.user_cuid) {
    res.status(403).end();
  } else {
    User.findOne({ cuid: req.params.user_cuid }).then((user) => {
      if (!user) {
        res.status(403).end();
      } else {
        user.talents = [];
        user.dominance = undefined;
        user.influence = undefined;
        user.steadiness = undefined;
        user.conscientiousness = undefined;
        return user.save();
      }
    }).then(result => {
      return Evaluate.remove({ requester: req.params.user_cuid });
    }).then(result => {
      return Token.remove({ requester: req.params.user_cuid });
    }).then(result => {
      res.json({ });
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}
