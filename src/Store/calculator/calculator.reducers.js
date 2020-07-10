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

const counter = (state = {total: 6}, action) => {
  return state;
};

// hard coding 6 as the total points here. This is sloppy and should be changed.
// Like this would come from an API server as data to persist this state for the player.

export default combineReducers({talentTrees, talents, counter});
