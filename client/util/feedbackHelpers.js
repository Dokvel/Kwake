import _ from 'lodash';

export function checkLimit(feedbacks, limit) {
  if (feedbacks.length === limit || feedbacks.length > limit) {
    return true;
  } else {
    return false;
  }
}

export function generateSummary(feedbacks) {
  let summaryFeedback = new Array(feedbacks[0].length);
  _.fill(summaryFeedback, 0);
  for (var i1 = 0; i1 < feedbacks.length; i1++) {
    for (var i2 = 0; i2 < feedbacks[i1].length; i2++) {
      summaryFeedback[i2] = summaryFeedback[i2] + feedbacks[i1][i2];
    }
  }
  for (var i = 0; i < summaryFeedback.length; i++) {
    summaryFeedback[i] = summaryFeedback[i] / feedbacks.length;
  }
  feedbacks.push(summaryFeedback);

  return feedbacks;
}
