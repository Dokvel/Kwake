import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

import { hasProfileCompleted } from './AppReducer';

// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function signIn(user) {
  return (dispatch) => {
    return callApi('signIn', 'post', { user })
      .then(res => {
        dispatch(authenticated(res.user));
        if (!hasProfileCompleted(res.user)) {
          browserHistory.push('/users/setup');
        } else {
          browserHistory.push('/profile');
        }
      });
  };
}

export function authenticated(user) {
  return {
    type: AUTHENTICATED,
    user,
  };
}

export function notAuthenticated() {
  return {
    type: NOT_AUTHENTICATED,
  };
}
