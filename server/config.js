import fbconfig from '../data/facebook.json';

function getGoogleCreds() {
  if (process.env.NODE_ENV === 'production') {
    return require('../data/google_creds_production.json');
  } else if (process.env.NODE_ENV === 'staging') {
    return require('../data/google_creds_staging.json');
  } else {
    return require('../data/google_creds.json');
  }
}

const googleCreds = getGoogleCreds();

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/kwake',
  port: process.env.PORT || 8000,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || googleCreds.client_id,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || googleCreds.client_secret,
  GOOGLE_SCOPES: googleCreds.scopes,
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'secretSecretPassword'
  },
  sessionSecret: process.env.SESSION_SECRET || 'd41d8cd98f00b204e9800998ecf8427e',
  FB_APP_ID: fbconfig[process.env.NODE_ENV || 'development'].appId
};

export default config;
