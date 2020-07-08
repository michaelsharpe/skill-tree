import data from './data/talents.json';

const api = {
  loadTalentTrees() {
    return Promise.resolve(data);
  },
};

export default api;
