const {schema} = require('normalizr');

export const talentNode = new schema.Entity('talents');

talentNode.define({
  children: [talentNode],
});

export const talentTree = new schema.Entity('talentTrees', {
  talents: [talentNode],
});
