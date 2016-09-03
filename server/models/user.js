import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import _ from 'lodash';

mongoose.Promise = Promise;

const userSchema = new Schema({
  givenName: { type: 'String', required: true },
  familyName: { type: 'String', required: true },
  gender: { type: 'String' },
  image: { type: 'String', required: true },
  email: { type: 'String', required: true },
  googleId: { type: 'String', required: true },
  googleAccessToken: { type: 'String', required: true },
  googleRefreshToken: { type: 'String' },
  googleExpiryDate: { type: 'Number', required: true },
  authenticationToken: { type: 'String' },
  cuid: { type: 'String', required: true },
  talents: [],
  dominance: { type: 'Number' },
  influence: { type: 'Number' },
  steadiness: { type: 'Number' },
  conscientiousness: { type: 'Number' },
  scoreLimit: { type: 'Number' }
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model('User', userSchema);

export function publicUserParams(user) {
  return _.omit(user, ['_id', 'googleId', 'googleAccessToken', 'authenticationToken', 'googleRefreshToken']);
}

export function getGoogleCredentials(user) {
  return {
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
    expiry_date: user.googleExpiryDate
  };
}
