// Import Actions
import { ADD_USER } from './UserActions';
import { AUTHENTICATED } from '../App/AppActions';

// Initial State
const initialState = { list: {} };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
    case AUTHENTICATED:
      return {
        ...state,
        list: {
          ...state.list,
          [action.user.cuid]: action.user
        }
      };
    default:
      return state;
  }
};

// Get user by cuid
export const getUser = (state, cuid) => state.users.list[cuid];

export default UserReducer;
