import {normalize, denormalize} from 'normalizr';

import {talentTree} from '../Store/schema';

export const normalizeTreeData = data => {
  return normalize(data, [talentTree]);
};

export const normalizeSingleTree = data => {
  return normalize(data, talentTree);
};

export const denormalizeTreeData = (data, entities) => {
  return denormalize(data, talentTree, entities);
};
