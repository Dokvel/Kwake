import { callAdminApi } from '../../util/apiCaller';

export const ADD_USERS = 'ADD_USERS';
export const ADD_TOKENS = 'ADD_TOKENS';

export function fetchUsers() {
  return (dispatch) => {
    return callAdminApi('users').then(res => {
      dispatch(addUsers(res.users));
    });
  };
}

export function addUsers(users) {
  return {
    type: ADD_USERS,
    users,
  };
}

export function fetchTokens(cuid) {
  return (dispatch) => {
    return callAdminApi(`users/tokens`)
      .then(res => dispatch(addTokens(res.tokens)));
  };
}

export function addTokens(tokens) {
  return {
    type: ADD_TOKENS,
    tokens,
  };
}
