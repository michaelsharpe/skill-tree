const data = require('./../../src/data/talents.json');

const {normalizeTreeData} = require('./../../src/helpers/normalizeData');

const normalized = normalizeTreeData(data);

describe('Talent scren', () => {
  it('displays the talent icons', () => {
    cy.visit('/');

    Object.values(normalized.entities.talents).forEach(talent => {
      cy.get(`[cy-test="${talent.name}"]`).should(
        'have.css',
        'background-image',
      );
    });
  });
});
