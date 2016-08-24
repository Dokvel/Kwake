import User from '../models/user';
import cuid from 'cuid';
import google from 'googleapis';
import serverConfig from '../config';
import crypto from 'crypto';

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(serverConfig.GOOGLE_CLIENT_ID, serverConfig.GOOGLE_CLIENT_SECRET, 'postmessage');
var auth2 = google.oauth2('v2');

function generateRandomToken() {
  var buffer = crypto.pseudoRandomBytes(256);
  return crypto.createHash('sha1').update(buffer).digest("hex");
}

export function signIn(req, res) {
  if (!req.body.code) {
    res.status(403).end();
  }

  oauth2Client.getToken(req.body.code, (err, tokens) => {
    if (err) {
      res.status(500).send(err);
    } else {
      oauth2Client.setCredentials(tokens);
      auth2.userinfo.get({ auth: oauth2Client }, (err, userInfo)=> {
        var authenticationToken = generateRandomToken(); //Our api token

        const user = new User({
          cuid: cuid(),
          googleId: userInfo.id,
          email: userInfo.email,
          image: userInfo.picture,
          givenName: userInfo.given_name,
          familyName: userInfo.family_name,
          googleAccessToken: tokens.access_token,
          authenticationToken
        });

        User.findOne({ googleId: user.googleId }).exec((err, existUser) => {
          if (err) {
            res.status(500).send(err);
          }

          if (existUser) {
            existUser.googleAccessToken = tokens.access_token;
            existUser.authenticationToken = authenticationToken;
            existUser.save((err, saved) => {
              if (err) {
                res.status(500).send(err);
              }
              //res.json({ user: saved })
              res.json({ authenticationToken: saved.authenticationToken });
            });
          } else {
            user.save((err, saved) => {
              if (err) {
                res.status(500).send(err);
              }
              //res.json({ user: saved })
              res.json({ authenticationToken: saved.authenticationToken });
            });
          }
        });
      });
    }
  });
}

export function user_info(req, res) {
  res.json({ user: req.user });
}
