import googleCreds from '../data/google_creds.json';

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/kwake',
  port: process.env.PORT || 8000,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || googleCreds.client_id,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ||  googleCreds.client_secret
};

export default config;
