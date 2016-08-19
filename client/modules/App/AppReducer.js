// Import Actions
import { TOGGLE_ADD_POST, AUTHENTICATED, NOT_AUTHENTICATED } from './AppActions';
import { SETUP_PROFILE } from '../User/UserActions';

// Initial State
const initialState = {
  showAddPost: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case SETUP_PROFILE:
    case AUTHENTICATED:
      return {
        ...state,
        currentUser: action.user,
      };
    case NOT_AUTHENTICATED:
      return {
        ...state,
        currentUser: undefined,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get currentUser
export const getCurrentUser = state => state.app.currentUser;
export const hasProfileCompleted = user => {
  return user.dominance !== undefined
    && user.influence !== undefined
    && user.steadiness !== undefined
    && user.conscientiousness !== undefined
    && user.talents && user.talents.length === 5
};

// Export Reducer
export default AppReducer;
