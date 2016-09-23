// Export Constants
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const UPDATE_FLASH_MESSAGE = 'UPDATE_FLASH_MESSAGE';
export const DESTROY_FLASH_MESSAGE = 'DESTROY_FLASH_MESSAGE';

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

export function showFlashMessage(title, text) {
  return (dispatch)=> {
    dispatch({ type: UPDATE_FLASH_MESSAGE, title, text });
  }
}
export function hideFlashMessage() {
  return (dispatch)=> {
    dispatch({ type: DESTROY_FLASH_MESSAGE });
  }
}
