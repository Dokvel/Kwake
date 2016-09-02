import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_TOKEN_INFO = 'ADD_TOKEN_INFO';
export const ADD_EVALUATES = 'ADD_EVALUATES';

// Export Actions
export function fetchTokenInfo(token) {
  return (dispatch) => {
    return callApi(`evaluate/${token}`)
      .then(res => dispatch(addTokenInfo(token, res.user))).catch((error) => {
        if (error.response.status === 403) {
          browserHistory.push('/');
        }
      });
  };
}

export function getEvaluates() {
  return (dispatch) => {
    return callApi('evaluates', 'get').then(res => {
      dispatch(addEvaluates(res.evaluates));
    })
  };
}

export function addTokenInfo(token, info) {
  return {
    type: ADD_TOKEN_INFO,
    info,
    token
  };
}

export function addEvaluates(evaluates) {
  return {
    type: ADD_EVALUATES,
    evaluates
  };
}
