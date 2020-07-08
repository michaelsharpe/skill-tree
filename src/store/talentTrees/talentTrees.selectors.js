import {denormalize} from 'normalizr';

import * as schema from '../schema';

export const selectTalent = (state, id) => {
  console.log('state', state);
  return denormalize(id, schema.talentNode, state);
};

export const selectTalentTree = (state, id) => {
  return denormalize(id, schema.talentTree, state);
};
