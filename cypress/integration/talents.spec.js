const data = require('./../../src/Data/talents.json');

const {normalizeTreeData} = require('./../../src/Helpers/normalizeData');

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

  it('tracks talent points across selected talents', () => {
    cy.visit('/');

    cy.contains('Points Spent');
    cy.get('[cy-test="counter"]').should('contain', 0);
    cy.get('[cy-test="stack"]').click();
    cy.get('[cy-test="counter"]').should('contain', 1);
    cy.get('[cy-test="stack"]').click();
    cy.get('[cy-test="counter"]').should('contain', 0);

    // here we ensure that 6 is the max even if all icons are clicked
    Object.values(normalized.entities.talents).forEach(talent => {
      cy.get(`[cy-test="${talent.name}"]`).click();
    });

    cy.get('[cy-test="counter"]').should('contain', 6);

    // additional tests would deselect the icons in order backwards to ensure they can be emptied out again.
  });
});
