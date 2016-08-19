import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const SETUP_PROFILE = 'SETUP_PROFILE';

// Export Actions
export function setupProfileRequest(user) {
  return (dispatch) => {
    return callApi('profile', 'put', { user })
      .then(res => {
        dispatch(setupProfile(res.user));
        browserHistory.push('/profile');
      }).catch((error)=> {
        console.log(error.message)
      });
  };
}

export function setupProfile(user) {
  return {
    type: SETUP_PROFILE,
    user
  };
}
