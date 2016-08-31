import _ from 'lodash';

export function generateAVG(keys, rates) {
  let result = {};
  _.each(keys, key => {
    result[key] = _.meanBy(rates, key);
  });
  return result;
}
