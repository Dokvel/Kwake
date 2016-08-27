// Export Constants
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

// Export Actions

export function authenticated(user) {
  return {
    type: AUTHENTICATED,
    user,
  };
}

export function notAuthenticated() {
  return (dispatch)=> {
    localStorage.removeItem('authentication_token');
    dispatch({ type: NOT_AUTHENTICATED });
  }
}
