import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.Promise = Promise;

const userSchema = new Schema({
    requester: { type: 'String', required: true },
    responderEmail: { type: 'String', required: true },
    token: { type: 'String', required: true },
    type: { type: 'String', required: true },
    _id: { type: 'String' },
    dateUsed: { type: 'Date' },
  }, { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model('Token', userSchema);

export const TYPE_EVALUATE = 'evaluate';
