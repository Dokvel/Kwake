import _ from 'lodash';

export function checkLimit(feedbacks, limit) {
  if (feedbacks.length === limit || feedbacks.length > limit) {
    return true;
  } else {
    return false;
  }
}

export function generateAVG(rates) {
  let params = Object.keys(rates[0]);
  let values = [];
  _.each(params, param => {
    values.push(_.sumBy(rates, param) / rates.length);
  });
  let AVG = _.zipObject(params, values);
  return AVG;
}
