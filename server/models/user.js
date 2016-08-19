import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  givenName: { type: 'String', required: true },
  familyName: { type: 'String', required: true },
  image: { type: 'String', required: true },
  email: { type: 'String', required: true },
  googleId: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  talents: [],
  dominance: { type: 'Number' },
  influence: { type: 'Number' },
  steadiness: { type: 'Number' },
  conscientiousness: { type: 'Number' }
});

export default mongoose.model('User', userSchema);
