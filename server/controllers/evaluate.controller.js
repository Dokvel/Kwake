import Evaluate from '../models/evaluate';
import Token, { TYPE_EVALUATE } from '../models/token';
import User from '../models/user';

import cuid from 'cuid';
import { generateRandomToken } from '../util/security';
import _ from 'lodash';

export function getEvaluate(req, res) {
  if (!req.params.token) {
    res.status(403).end();
  } else {
    Token.findOne({ token: req.params.token, type: TYPE_EVALUATE }).exec((err, token) => {
      if (err) {
        res.status(500).send(err);
      } else if (!token) {
        res.status(403).end();
      } else {
        if (token.dateUsed) {
          res.status(403).end();
        } else {
          User.findOne({ cuid: token.requester }, 'givenName familyName image talents dominance influence steadiness conscientiousness').exec((err, user) => {
            if (err) {
              res.status(500).send(err);
            }
            res.json({ user: _.omit(user.toObject(), '_id') });
          });
        }
      }
    });
  }
}

export function addEvaluate(req, res) {
  if (!req.params.token || !req.body.talents || !req.body.statements || !req.body.personalityKey) {
    res.status(403).end();
  } else {
    Token.findOne({ token: req.params.token, type: TYPE_EVALUATE }).exec((err, token) => {
      if (err) {
        res.status(500).send(err);
      } else if (!token) {
        res.status(403).end();
      } else {
        if (token.dateUsed) {
          res.status(403).end();
        } else {
          let evaluate = new Evaluate({
            cuid: cuid(),
            requester: token.requester,
            responderEmail: token.responderEmail,
            personalityKey: req.body.personalityKey,
            talents: req.body.talents,
            statements: req.body.statements
          });

          let savedEvaluate;

          evaluate.save((err, saved) => {
            if (err) {
              res.status(500).send(err);
            } else {
              savedEvaluate = saved;
              token.dateUsed = Date.now();
              token.save((err, saved) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.json({ evaluate: savedEvaluate });
                }
              });
            }
          });
        }
      }
    });
  }
}

export function createEvaluateRequest(req, res) {
  if (!req.body.emails) {
    res.status(403).end();
  } else {
    let tokensObjects = req.body.emails.map((email) => {
      return {
        _id: cuid(),
        requester: req.user.cuid,
        responderEmail: email,
        type: TYPE_EVALUATE,
        token: generateRandomToken(),
        created_at: new Date()
      }
    });

    Token.collection.insert(tokensObjects, (err, saveTokens) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ tokens: saveTokens });
      }
    });
  }
}
