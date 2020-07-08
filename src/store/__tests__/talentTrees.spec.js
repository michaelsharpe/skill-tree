import {createStore, applyMiddleware} from 'redux';
import {normalize} from 'normalizr';
import thunk from 'redux-thunk';

import talentTreeReducer from '../calculator/calculator.reducers';
import {loadTalentTrees} from '../calculator/calculator.actions';

import * as schema from '../schema';

describe('talentTrees', () => {
  describe('load talentTrees action', () => {
    let store;
    let entities;

    beforeEach(() => {
      const trees = [
        {
          name: 'tree1',
          id: 1,
          talents: [{name: 'node1', id: 2, children: [{name: 'node2', id: 3}]}],
        },
      ];

      const normalizedData = normalize(trees, [schema.talentTree]);
      entities = normalizedData.entities;

      const api = {
        loadTalentTrees: () => Promise.resolve(trees),
      };

      const initialState = {
        talentTrees: [],
      };

      store = createStore(
        talentTreeReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument({api, schema})),
      );

      return store.dispatch(loadTalentTrees());
    });

    it('stores the talent trees as normalized data', () => {
      const {talentTrees} = entities;
      expect(store.getState().talentTrees).toEqual(talentTrees);
    });

    it('stores the talents as nornmalizes data', () => {
      const {talents} = entities;
      expect(store.getState().talents).toEqual(talents);
    });
  });
});
