import {normalize} from 'normalizr';

export const ADD_ENTITIES = 'ADD_ENTITIES';

export const loadTalentTrees = () => (dispatch, getState, {api, schema}) => {
  api.loadTalentTrees().then(response => {
    const data = normalize(response, [schema.talentTree]);
    dispatch(addEntities(data.entities));
  });
};

export const addEntities = entities => ({
  type: ADD_ENTITIES,
  payload: entities,
});

// this could likelt be abstracted into an "update entity call"
export const updateTalent = (talent, update) => (
  dispatch,
  getState,
  {api, schema},
) => {
  api.updateTalent(talent, update).then(talent => {
    const data = normalize(talent, schema.talentNode);
    dispatch(addEntities(data.entities));
  });
};
