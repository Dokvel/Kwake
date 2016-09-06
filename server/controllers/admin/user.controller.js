import User, { publicUserParams } from '../../models/user';
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
