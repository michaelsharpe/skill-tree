import {combineReducers} from 'redux';

import {ADD_ENTITIES} from './calculator.actions';

const talentTrees = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...action.payload.talentTrees,
      };

    default:
      return state;
  }
};

const talents = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...action.payload.talents,
      };

    default:
      return state;
  }
};

export default combineReducers({talentTrees, talents});
