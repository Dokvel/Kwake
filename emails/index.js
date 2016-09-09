import path from 'path';
import { emailsSender } from './emailHelper';

import { getPronoun, indefiniteArticle } from '../utils/textHelpers';
var templatesDir = path.resolve(__dirname, 'templates');

export const SUPPORT_ADDRESS = 'info@kwakeapp.com';
export const PRODUCTION_DOMAIN = 'http://kwakeapp.com';

export function sendEvaluateRequest(data) {
  data = data.map((item, index)=> {
    item.subject = `Rate how ${item.givenName} works anonymously`;
    item.evaluateLink = `${PRODUCTION_DOMAIN}/evaluate/${item.token}?sign_in=${Math.abs(index % 2) == 1}`;
    item.fs = { getPronoun, indefiniteArticle };
    return item;
  })
  emailsSender(path.join(templatesDir, 'evaluate-request'), data, SUPPORT_ADDRESS);
}
