/// <reference types="cypress" />

import StateRepo from "../../Reusable-Utilities/StateRepo.cy";

// Global exception handler to avoid test failures due to uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // Log the error for debugging purposes
  console.error('Uncaught Exception:', err);
  return false;
});

describe("Multilingual State Validation", () => {
  const expectedStates = StateRepo.getExpectedStates();

  // Implement Pages
  const ImplementPageUrls = {
    english: `${Cypress.env('url')}tractor-implements/`,
    hindi: `${Cypress.env('url')}hi/tractor-implements/`,
    marathi: `${Cypress.env('url')}mr/tractor-implements/`,
    tamil: `${Cypress.env('url')}ta/tractor-implements/`,
    telugu: `${Cypress.env('url')}te/tractor-implements/`,
  };

// Implement Grid on Home Page
  const ImplementGridUrls = {
    english: `${Cypress.env('url')}`,
    hindi: `${Cypress.env('url')}hi/`,
    marathi: `${Cypress.env('url')}mr/`,
    tamil: `${Cypress.env('url')}ta/`,
    telugu: `${Cypress.env('url')}te/`,
  };

// Reusable function for main page
const validateStatesMainPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  cy.get(':nth-child(3) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').first().click();
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
    cy.wait(2000);
    cy.get(':nth-child(1) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
  
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

  // Test cases for Implement Pages

  describe("Implement Pages - State Validation", () => {
    it("1. Validate State Names in English (Implement Pages)", () => {
      validateStatesMainPage(ImplementPageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Implement Pages)", () => {
      validateStatesMainPage(ImplementPageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Implement Pages)", () => {
      validateStatesMainPage(ImplementPageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Implement Pages)", () => {
      validateStatesMainPage(ImplementPageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Implement Pages)", () => {
      validateStatesMainPage(ImplementPageUrls.telugu, 'telugu', expectedStates);
    });
  });

  // Test cases for Implement Grid on Home Page

  describe("Implement Grid - State Validation", () => {
    it("6. Validate State Names in English (Implement Grid: HP)", () => {
      validateStatesGridPage(ImplementGridUrls.english, 'english', expectedStates);
    });

    it("7. Validate State Names in Hindi (Implement Grid: HP)", () => {
      validateStatesGridPage(ImplementGridUrls.hindi, 'hindi', expectedStates);
    });

    it("8. Validate State Names in Marathi (Implement Grid: HP)", () => {
      validateStatesGridPage(ImplementGridUrls.marathi, 'marathi', expectedStates);
    });

    it("9. Validate State Names in Tamil (Implement Grid: HP)", () => {
      validateStatesGridPage(ImplementGridUrls.tamil, 'tamil', expectedStates);
    });

    it("10. Validate State Names in Telugu (Implement Grid: HP)", () => {
      validateStatesGridPage(ImplementGridUrls.telugu, 'telugu', expectedStates);
    });
  });
});
