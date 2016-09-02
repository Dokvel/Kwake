import _ from 'lodash';
import personalityTypes from '../data/personalityTypes';

//Function is separated for future
export function generateDiscKey(discValues) {
  return `${discValues.dominance}${discValues.influence}${discValues.steadiness}${discValues.conscientiousness}`;
}

export function getPersonalityType(discValues) {
  return _.keyBy(personalityTypes, 'key')[generateDiscKey(discValues)];
}

export const PERSONALITY_STATEMENT = 'personality';
export const TEAM_STATEMENT = 'team';
export const TROUBLESHOOTING_STATEMENT = 'troubleshooting';

export const STATEMENTS = [PERSONALITY_STATEMENT, TEAM_STATEMENT, TROUBLESHOOTING_STATEMENT]
