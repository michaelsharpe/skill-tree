import {denormalize} from 'normalizr';
import {createSelector} from 'reselect';

import * as schema from '../schema';

// special selector here.  Conditional so that when testing and there is no calculator on the state, we know we are inside it/
export const selectCalculator = state =>
  state.calculator ? state.calculator : state;

export const selectCounter = state => selectCalculator(state).counter;

export const selectCounterTotal = state => selectCounter(state).total;

export const selectNormalizedTalentTrees = state =>
  selectCalculator(state).talentTrees;

export const selectNormalizedTalentNodes = state =>
  selectCalculator(state).talents;

export const selectTalent = (state, id) =>
  denormalize(id, schema.talentNode, selectCalculator(state));

export const selectTalentTree = (state, id) =>
  denormalize(id, schema.talentTree, selectCalculator(state));

export const selectAllTalentTrees = createSelector(
  [selectNormalizedTalentTrees, selectCalculator],
  (normalizedTalentTrees, calculator) =>
    Object.values(normalizedTalentTrees).map(tree =>
      selectTalentTree(calculator, tree.id),
    ),
);

export const selectUnlockedTalents = createSelector(
  [selectNormalizedTalentNodes],
  talentNodes => Object.values(talentNodes).filter(node => node.unlocked),
);
