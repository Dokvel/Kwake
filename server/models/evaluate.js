import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  requester: { type: 'String', required: true },
  responderEmail: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  personalityKey: { type: 'String', required: true },
  statements: {},
  talents: {}
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model('Evaluate', userSchema);
