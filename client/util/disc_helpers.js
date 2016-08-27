import _ from 'lodash';
import personalityTypes from '../../data/personalityTypes';

//Function is separated for future
export function generateDiscKey(discValues) {
  return `${discValues.dominance}${discValues.influence}${discValues.steadiness}${discValues.conscientiousness}`;
}

export function getPersonalityType(discValues) {
  return _.keyBy(personalityTypes, 'key')[generateDiscKey(discValues)];
}
