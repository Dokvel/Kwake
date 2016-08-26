import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  requester: { type: 'String', required: true },
  responderEmail: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  personalityKey: { type: 'String', required: true },
  statements: { },
  talents: { },
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Evaluate', userSchema);
