import _ from 'lodash';

export function generateDiscKey(user) {
  let key = `${user.dominance}${user.influence}${user.steadiness}${user.conscientiousness}`;

  return key;
}
