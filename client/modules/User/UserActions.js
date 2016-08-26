import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_USER = 'ADD_USER';

// Export Actions
export function setupProfileRequest(user) {
  return (dispatch) => {
    return callApi('profile', 'put', { user })
      .then(res => {
        dispatch(addUser(res.user));
        browserHistory.push('/profile/' + res.user.cuid);
      });
  };
}

export function fetchUser(cuid) {
  return (dispatch) => {
    return callApi(`users/${cuid}`).then(res => dispatch(addUser(res.user)));
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}
