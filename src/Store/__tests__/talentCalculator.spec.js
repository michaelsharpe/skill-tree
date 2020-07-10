import {createStore, applyMiddleware} from 'redux';
import {normalize} from 'normalizr';
import thunk from 'redux-thunk';

import talentTreeReducer from '../talentCalculator/talentCalculator.reducers';
import {
  loadTalentTrees,
  updateTalent,
} from '../talentCalculator/talentCalculator.actions';
import {
  selectAllTalentTrees,
  selectTalent,
  selectUnlockedTalents,
} from '../talentCalculator/talentCalculator.selectors';

import * as schema from '../schema';

describe('talentTrees', () => {
  let store;
  let entities;

  const setup = (trees, state, action) => {
    const normalizedData = normalize(trees, [schema.talentTree]);
    entities = normalizedData.entities;

    const api = {
      loadTalentTrees: () => Promise.resolve(trees),
      updateTalent: (talent, updates) =>
        Promise.resolve({...talent, ...updates}),
    };

    const initialState = {...state, ...entities};

    store = createStore(
      talentTreeReducer,
      initialState,
      applyMiddleware(thunk.withExtraArgument({api, schema})),
    );

    if (action) {
      return store.dispatch(action);
    }
  };

  describe('load talentTrees action', () => {
    describe('loading data', () => {
      let trees;
      beforeEach(() => {
        trees = [
          {
            name: 'tree1',
            id: 1,
            talents: [
              {icon: 'node1', id: 2, children: [{icon: 'node2', id: 3}]},
            ],
          },
        ];

        const initialState = {
          talentTrees: [],
        };

        setup(trees, initialState, loadTalentTrees());
      });

      it('stores the talent trees as normalized data', () => {
        const {talentTrees} = entities;
        expect(store.getState().talentTrees).toEqual(talentTrees);
      });

      it('stores the talents as nornmalizes data', () => {
        const {talents} = entities;
        expect(store.getState().talents).toEqual(talents);
      });

      it('return the correct value from the state', () => {
        // here we need to mock the full application state path whiich our selectors expect
        expect(selectAllTalentTrees(store.getState())).toEqual(trees);
      });
    });
  });

  describe('update talent action', () => {
    beforeEach(() => {
      const trees = [
        {
          name: 'tree1',
          id: 1,
          talents: [
            {
              icon: 'node1',
              id: 2,
              unlocked: true,
              children: [
                {icon: 'node2', id: 3, unlocked: true},
                {icon: 'node2', id: 4, unlocked: false},
              ],
            },
          ],
        },
      ];

      return setup(trees, {});
    });

    it('updates a talent', async () => {
      await store.dispatch(
        updateTalent(entities.talents['4'], {unlocked: true}),
      );
      // test here with the proper selector
      expect(selectTalent(store.getState(), 4).unlocked).toEqual(true);
    });
  });

  describe('selectors', () => {
    describe('selectUnlockedTalents', () => {
      it('should return all unlocked talents', async () => {
        const trees = [
          {
            name: 'tree1',
            id: 1,
            talents: [
              {
                icon: 'node1',
                id: 2,
                unlocked: true,
                children: [
                  {icon: 'node2', id: 3, unlocked: true},
                  {icon: 'node2', id: 4, unlocked: false},
                ],
              },
            ],
          },
        ];

        await setup(trees, {});

        expect(selectUnlockedTalents(store.getState()).length).toEqual(2);
      });
    });
  });
});
