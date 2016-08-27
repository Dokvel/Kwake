import _ from 'lodash';

// Import Actions
import { ADD_TOKEN_INFO, ADD_EVALUATES } from './EvaluateActions';

// Initial State
const initialState = { tokenInfo: {}, list: {} };

const EvaluateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN_INFO:
      return {
        ...state,
        tokenInfo: {
          ...state.tokenInfo,
          [action.token]: action.info
        }
      };
    case ADD_EVALUATES:
      let evaluates = _.keyBy(action.evaluates, 'cuid');

      return {
        ...state,
        list: {
          ...state.list,
          ...evaluates
        }
      };
    default:
      return state;
  }
};

// Get evaluate info by token
export const getTokenInfo = (state, token) => state.evaluate.tokenInfo[token];

export const getUserEvaluates = (state, cuid) => _.filter(state.evaluate.list, { 'requester': cuid });

export default EvaluateReducer;
