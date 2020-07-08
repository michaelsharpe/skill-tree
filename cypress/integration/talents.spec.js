const data = require('./../../src/data/talents.json');

const {normalizeTreeData} = require('./../../src/helpers/normalizeData');

const normalized = normalizeTreeData(data);

describe('Talent scren', () => {
  it('displays the talent icons', () => {
    cy.visit('/');

    Object.entries(normalized.entities.talents).forEach(([id, talent]) => {
      cy.contains(talent.name);
    });
  });
});
