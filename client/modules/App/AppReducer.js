// Import Actions
import { AUTHENTICATED, NOT_AUTHENTICATED, UPDATE_FLASH_MESSAGE, DESTROY_FLASH_MESSAGE } from './AppActions';
import { getUser } from '../User/UserReducer';
import cuid from 'cuid';

// Initial State
const initialState = {};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        currentUser: action.user.cuid,
      };
    case UPDATE_FLASH_MESSAGE:
      window.flashMessage = { title: action.title, text: action.text };
      return { ...state, flashMessageId: cuid() };
    case DESTROY_FLASH_MESSAGE:
      window.flashMessage = undefined;
      return { ...state, flashMessageId: cuid() };
    case NOT_AUTHENTICATED:
      return initialState;
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get currentUser
export const getCurrentUser = state => getUser(state, state.app.currentUser);

export const hasProfileCompleted = user => {
  return user.dominance !== undefined
    && user.influence !== undefined
    && user.steadiness !== undefined
    && user.conscientiousness !== undefined
    && user.talents && user.talents.length === 5
};

// Export Reducer
export default AppReducer;
