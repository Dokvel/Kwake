import _ from 'lodash';

export function generateAVG(keys, rates) {
  let result = {};
  _.each(keys, key => {
    result[key] = _.meanBy(rates, key);
  });
  return result;
}

export function getColorRange(rate) {
  const colorRanges = [
    ['#ff3d4f', '#ff6c3f'],
    ['#ff4a46', '#ff9e2b'],
    ['#ff8920', '#ffd820'],
    ['#f7ff20', '#33e2a2'],
    ['#65ffb5', '#00e868']
  ];
  if (rate > 0 && rate <=1) {
    return colorRanges[0];
  } else if (rate > 1 && rate <=2) {
    return colorRanges[1];
  } else if (rate > 2 && rate <=3) {
    return colorRanges[2];
  } else if (rate > 3 && rate <=4) {
    return colorRanges[3];
  } else if (rate > 4 && rate <=5) {
    return colorRanges[4];
  }
}
