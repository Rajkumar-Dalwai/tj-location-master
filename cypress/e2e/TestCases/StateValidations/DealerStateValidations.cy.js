/// <reference types="cypress" />

import StateRepo from "../../Reusable-Utilities/StateRepo.cy";

describe("Multilingual State Validation", () => {
  const expectedStates = StateRepo.getExpectedStates();

  // Dealer Pages
  const DealerPageUrls = {
    english: `${Cypress.env('url')}find-tractor-dealers/powertrac/`,
    hindi: `${Cypress.env('url')}hi/find-tractor-dealers/powertrac/`,
    marathi: `${Cypress.env('url')}mr/find-tractor-dealers/powertrac/`,
    tamil: `${Cypress.env('url')}ta/find-tractor-dealers/powertrac/`,
    telugu: `${Cypress.env('url')}te/find-tractor-dealers/powertrac/`,
  };

// Dealer Grid on Product Detail Page
  const DealerGridUrls = {
    english: `${Cypress.env('url')}massey-ferguson-tractor/7250-power-up/`,
    hindi: `${Cypress.env('url')}hi/massey-ferguson-tractor/7250-power-up/`,
    marathi: `${Cypress.env('url')}mr/massey-ferguson-tractor/7250-power-up/`,
    tamil: `${Cypress.env('url')}ta/massey-ferguson-tractor/7250-power-up/`,
    telugu: `${Cypress.env('url')}te/massey-ferguson-tractor/7250-power-up/`,
  };

// Reusable function for main page
const validateStatesMainPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  cy.get(':nth-child(2) > .bg-color-white > .new-equipment-anchor').first().click();
  cy.wait(2000);

  // Wait for the state options to load using intercept
  cy.intercept('GET', '**/newsletterstate*').as('loadStates');
  // cy.wait('@loadStates', { timeout: 20000 });

  // Validate the number of states excluding the placeholder
  cy.get('#states')
    .find('option')
    .not(':first') // Skip the placeholder option
    .should('have.length', expectedStates.length);

  // Validate state names and log mismatches
  let mismatches = [];
  cy.get('#states')
    .find('option')
    .not(':first') // Skip the placeholder option
    .each(($option, index) => {
      const actual = $option.text().trim();
      const expected = expectedStates[index]?.[languageKey];
      if (actual !== expected) mismatches.push({ index, actual, expected });
    })
    .then(() => {
      if (mismatches.length) {
        cy.log('Mismatched States:', mismatches);
        throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
      } else {
        cy.log(`All states are matched accurately in ${languageKey}!`);
      }
    });
};

// Reusable function for Grid page
const validateStatesGridPage = (pageUrl, languageKey, expectedStates) => {
    cy.visit(pageUrl);
    cy.scrollTo('bottom', { duration: 5000 });
    cy.get('.cross', { timeout: 15000 }).should('be.visible').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .bg-color-white > .new-equipment-anchor').click();
  
    // Intercept the route with wildcard to match any variations in the URL
    cy.intercept('GET', '**/newsletterstate*').as('loadStates');

    // Validate the number of states excluding the placeholder
  cy.get('#states')
  .find('option')
  .not(':first') // Skip the placeholder option
  .should('have.length', expectedStates.length);

// Validate state names and log mismatches
let mismatches = [];
cy.get('#states')
  .find('option')
  .not(':first') // Skip the placeholder option
  .each(($option, index) => {
    const actual = $option.text().trim();
    const expected = expectedStates[index]?.[languageKey];
    if (actual !== expected) mismatches.push({ index, actual, expected });
  })
  .then(() => {
    if (mismatches.length) {
      cy.log('Mismatched States:', mismatches);
      throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
    } else {
      cy.log(`All states are matched accurately in ${languageKey}!`);
    }
  });
};

  // Test cases for Dealer Pages

  describe("Dealer Pages - State Validation", () => {
    it("1. Validate State Names in English (Dealer Pages)", () => {
      validateStatesMainPage(DealerPageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Dealer Pages)", () => {
      validateStatesMainPage(DealerPageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Dealer Pages)", () => {
      validateStatesMainPage(DealerPageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Dealer Pages)", () => {
      validateStatesMainPage(DealerPageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Dealer Pages)", () => {
      validateStatesMainPage(DealerPageUrls.telugu, 'telugu', expectedStates);
    });
  });

  // Test cases for Dealer Grid on Product Detail Page

  describe("Dealer Grid - State Validation", () => {
    it("6. Validate State Names in English (Dealer Grid: PDP)", () => {
      validateStatesGridPage(DealerGridUrls.english, 'english', expectedStates);
    });

    it("7. Validate State Names in Hindi (Dealer Grid: PDP)", () => {
      validateStatesGridPage(DealerGridUrls.hindi, 'hindi', expectedStates);
    });

    it("8. Validate State Names in Marathi (Dealer Grid: PDP)", () => {
      validateStatesGridPage(DealerGridUrls.marathi, 'marathi', expectedStates);
    });

    it("9. Validate State Names in Tamil (Dealer Grid: PDP)", () => {
      validateStatesGridPage(DealerGridUrls.tamil, 'tamil', expectedStates);
    });

    it("10. Validate State Names in Telugu (Dealer Grid: PDP)", () => {
      validateStatesGridPage(DealerGridUrls.telugu, 'telugu', expectedStates);
    });
  });
});
