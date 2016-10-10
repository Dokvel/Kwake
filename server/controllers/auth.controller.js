import User from '../models/user';
import Evaluate from '../models/evaluate';
import cuid from 'cuid';
import google from 'googleapis';
import serverConfig from '../config';
import { generateRandomToken } from '../util/security';

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(serverConfig.GOOGLE_CLIENT_ID, serverConfig.GOOGLE_CLIENT_SECRET, 'postmessage');
var auth2 = google.oauth2('v2');

export function signIn(req, res) {
  if (!req.body.code) {
    res.status(403).end();
  } else {
    oauth2Client.getToken(req.body.code, (err, tokens) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (tokens) {
          oauth2Client.setCredentials(tokens);
          auth2.userinfo.get({ auth: oauth2Client }, (err, userInfo)=> {
            if (err) {
              res.status(500).send(err);
            } else {
              let user = new User({
                cuid: cuid(),
                googleId: userInfo.id,
                email: userInfo.email,
                image: userInfo.picture,
                givenName: userInfo.given_name,
                familyName: userInfo.family_name,
                gender: userInfo.gender,
              });

              let isNewUser = true;
              let createdUser;
              User.findOne({ googleId: user.googleId })
                .then((existUser) => {
                  if (existUser) {
                    user = existUser;
                    isNewUser = false;
                  }

                  user.googleAccessToken = tokens.access_token;
                  user.googleRefreshToken = tokens.refresh_token || user.googleRefreshToken;
                  user.googleExpiryDate = tokens.expiry_date;
                  user.authenticationToken = generateRandomToken(); //Our api token

                  return User.findOne().sort('-created_at');
                })
                .then(lastUser => {
                  const scoreLimits = [3, 5];

                  if (!user.scoreLimit) {
                    if (!lastUser || !lastUser.scoreLimit) {
                      user.scoreLimit = scoreLimits[0];
                    } else if (user.cuid !== lastUser.cuid) {
                      let scoreIndex = scoreLimits.indexOf(lastUser.scoreLimit) + 1;
                      scoreIndex = scoreIndex === scoreLimits.length ? 0 : scoreIndex;
                      user.scoreLimit = scoreLimits[scoreIndex];
                    }
                  }

                  return user.save();
                })
                .then(saved => {
                  createdUser = saved;
                  return Evaluate.count({ responderEmail: createdUser.email });
                })
                .then(evaluateCount => {
                  res.json({
                    authenticationToken: createdUser.authenticationToken,
                    isNewUser,
                    havePassedRequest: evaluateCount > 0
                  });
                })
                .catch(err => {
                  res.status(500).send(err);
                });
            }
          });
        } else {
          res.status(403).end();
        }
      }
    });
  }
}
