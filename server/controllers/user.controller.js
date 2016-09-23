import User, { publicUserParams, getGoogleCredentials } from '../models/user';
import Token, { TYPE_EVALUATE } from '../models/token';
import Evaluate from '../models/evaluate';
import _ from 'lodash';
import cuid from 'cuid';
import google from 'googleapis';
import serverConfig from '../config';

import { getPersonalityType } from '../../utils/disc_helpers';

import React from 'react';
import FacebookSharePost from '../../common/feed_posts/FacebookSharePost';
import querystring from 'querystring';
import tmp from 'tmp';
import fs from 'pn/fs';
import svg2png from 'svg2png';
import { renderToString } from 'react-dom/server';

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(serverConfig.GOOGLE_CLIENT_ID, serverConfig.GOOGLE_CLIENT_SECRET, 'postmessage');

export function setupProfile(req, res) {
  if (!req.body.user.talents
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
  let demoTalents = ["SIGNIFICANCE", "IDEATION", "DEVELOPER", "DELIBERATIVE", "ARRANGER"];

  let personalityTypeKeyObj = {
    conscientiousness: 1,
    influence: 0,
    dominance: 1,
    steadiness: 1
  };

  let user = new User({
    cuid: "demo_user",
    googleId: "110195993537819882539",
    email: "demo.kwake@gmail.com",
    image: "https://lh4.googleusercontent.com/-9GtzGQSWlcY/AAAAAAAAAAI/AAAAAAAAAAs/rQ3kmKyAtVo/photo.jpg",
    givenName: "Kwake", familyName: "Demo",
    scoreLimit: 10,
    talents: demoTalents,
    ...personalityTypeKeyObj,
    googleAccessToken: 'demo_access_token',
    googleRefreshToken: 'demo_refresh_token',
    googleExpiryDate: 651616516516,
    gender: 'male'
  });

  let evaluateToken = new Token({
    _id: "demo_token_id",
    requester: "demo_user",
    responderEmail: "test@test.com",
    type: TYPE_EVALUATE,
    token: "demo_token"
  });

  User.find().then(users => {
    users.forEach((user)=> {
      let tokens = getGoogleCredentials(user);
      oauth2Client.setCredentials(tokens);
      oauth2Client.revokeCredentials(result => {
        console.log('Google removed creds: ' + user.cuid);
      })
    });
    return User.remove()
  }).then(result => {
    return user.save();
  }).then(saved => {
    return Token.remove();
  }).then(result => {
    return evaluateToken.save();
  }).then(savedToken => {
    return Evaluate.remove();
  }).then(result => {
    let evaluates = [];
    let personalityKey = getPersonalityType(personalityTypeKeyObj).key;

    _.times(10, () => {
      let talents = {};
      _.each(demoTalents, (talentKey) => {
        talents[talentKey] = _.random(1, 5, true);
      });
      let evaluateObj = {
        cuid: cuid(),
        requester: user.cuid,
        responderEmail: evaluateToken.responderEmail,
        personalityKey,
        statements: {
          personality: _.random(1, 5, true),
          troubleshooting: _.random(1, 5, true),
          team: _.random(1, 5, true)
        },
        talents
      };
      evaluates.push(new Evaluate(evaluateObj));
    });

    return Evaluate.create(evaluates);
  }).then(savedEvaluates => {
    res.redirect('/');
  }).catch(err => res.status(500).send(err));
}

export function getUser(req, res) {
  if (!req.params.cuid) {
    res.status(403).end();
  } else {
    User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(403).end();
      } else {
        res.json({ user: publicUserParams(user.toObject()) });
      }
    });
  }
}

export function getUserSmPostPicture(req, res) {
  if (!req.params.user_cuid) {
    res.status(403).end();
  } else {
    User.findOne({ cuid: req.params.user_cuid }).then(user => {
      if (!user) {
        res.status(403).end();
      } else {
        let filePath;
        tmp.file({
          mode: 0o644,
          prefix: 'facebookPost-',
          postfix: '.svg'
        }, function _tempFileCreated(err, path, fd, cleanupCallback) {
          if (err) throw err;
          let svg = querystring.unescape(encodeURIComponent(renderToString(
            <FacebookSharePost personalityType={getPersonalityType(user).name}
                               displayName={`${user.givenName} ${user.familyName}`} selector="dsg"/>
          )));
          filePath = path;
          fs.writeFile(path, svg, (err) => {
            if (err) throw err;
            fs.readFile(filePath)
              .then(svg2png)
              .then(buffer => {
                res.writeHead(200, {
                  'Content-Type': 'image/png',
                  'Content-Length': buffer.length
                });
                res.end(buffer);
                cleanupCallback();
              })
              .catch(e => console.error(e));
          });
        });
      }
    }).catch(err=> {
      res.status(500).send(err);
    });
  }
}

export function getCurrentUser(req, res) {
  res.json({ user: publicUserParams(req.user.toObject()) });
}

export function getEncounters(req, res) {
  var calendar = google.calendar('v3');
  oauth2Client.setCredentials(getGoogleCredentials(req.user));

  let today = new Date();
  let twoMonthAgo = new Date();
  twoMonthAgo.setMonth(twoMonthAgo.getMonth() - 2);

  let params = {
    auth: oauth2Client,
    calendarId: 'primary',
    timeMin: twoMonthAgo.toISOString(),
    timeMax: today.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime',
    fields: 'items(attendees(displayName,email,id,self),end,start,status)'
  };

  let contacts = [];

  calendar.events.list(params, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      _.each(response.items, (item) => {
        if (item.attendees) {
          contacts = contacts.concat(item.attendees)
        }
      });

      contacts = _.filter(_.uniqBy(contacts, 'email'), item => item.email != req.user.email);

      Token.find({ type: TYPE_EVALUATE }, 'responderEmail').where('responderEmail').in(contacts.map(item=>item.email))
        .then((tokens)=> {
          let tokensObj = _.uniqBy(tokens.map(token => token.responderEmail));
          contacts = _.filter(contacts, item => tokensObj.indexOf(item.email) === -1);
          return User.find({}, 'givenName familyName image email').where('email').in(contacts.map(item=>item.email))
        })
        .then((users) => {
          contacts = _.keyBy(contacts, 'email');
          users.map(user => {
            if (!contacts[user.email].displayName) {
              contacts[user.email].displayName = `${user.givenName} ${user.familyName}`;
            }
            contacts[user.email].image = user.image;
          });

          res.json({ encounters: _.toArray(contacts) });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  });
}
