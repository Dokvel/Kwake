// Import Actions
import { ADD_EVALUATE } from './EvaluateActions';

// Initial State
const initialState = {};

const EvaluateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVALUATE:
      return {
        ...state,
        [action.token]: action.evaluate
      }

    default:
      return state;
  }
};

// Get evaluate info by token
export const getEvaluate = (state, token) => state.evaluate[token];

export default EvaluateReducer;
