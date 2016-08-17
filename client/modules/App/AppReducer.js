// Import Actions
import { TOGGLE_ADD_POST, AUTHENTICATED, NOT_AUTHENTICATED } from './AppActions';

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

// Export Reducer
export default AppReducer;
