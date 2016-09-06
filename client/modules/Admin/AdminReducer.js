import _ from 'lodash';

// Import Actions
import { ADD_USERS, ADD_TOKENS } from './AdminActions';

// Initial State
const initialState = { data: [], tokens: [] };

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS :
      return {
        ...state,
        data: _.toArray(action.users),
      };
    case ADD_TOKENS :
      return {
        ...state,
        tokens: _.toArray(action.tokens),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getUsers = state => state.admin.data;

// Get post by cuid
export const getUser = (state, cuid) => state.admin.data.filter(user => user.cuid === cuid)[0];

export const getUserTokens = (state, cuid) => state.admin.tokens.filter(token => token.requester === cuid);

// Export Reducer
export default AdminReducer;
