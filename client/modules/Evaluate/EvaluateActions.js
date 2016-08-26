import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_EVALUATE = 'ADD_EVALUATE';

// Export Actions
export function fetchEvaluate(token) {
  return (dispatch) => {
    return callApi(`evaluate/${token}`)
      .then(res => dispatch(addEvaluate(token, res.user))).catch((error) => {
        if (error.response.status === 403) {
          browserHistory.push('/');
        }
      });
  };
}

export function addEvaluate(token, evaluate) {
  return {
    type: ADD_EVALUATE,
    evaluate,
    token
  };
}
