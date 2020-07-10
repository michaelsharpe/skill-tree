import data from './Data/talents.json';

const api = {
  loadTalentTrees() {
    return Promise.resolve(data);
  },
  updateTalent(talent, updates) {
    const updated = {
      ...talent,
      ...updates,
    };

    return Promise.resolve(updated);
  },
};

export default api;
