import callApi from '../../util/apiCaller';

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
      .then(res => dispatch(authenticated(res.user)));
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
