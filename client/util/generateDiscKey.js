import _ from 'lodash';

// Import Static Data
import personalityTypes from '../../data/personalityTypes';

export function generateDiscKey(user) {
  let personalityTypesObj = _.keyBy(personalityTypes, 'key');
  let userType = personalityTypesObj[`${user.dominance}${user.influence}${user.steadiness}${user.conscientiousness}`];

  return userType;
}
