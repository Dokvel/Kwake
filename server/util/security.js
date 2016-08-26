import crypto from 'crypto';

export function generateRandomToken() {
  var buffer = crypto.pseudoRandomBytes(256);
  return crypto.createHash('sha1').update(buffer).digest("hex");
}
