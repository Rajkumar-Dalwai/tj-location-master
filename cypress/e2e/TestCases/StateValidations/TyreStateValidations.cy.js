/// <reference types="cypress" />

import StateRepo from "../../Reusable-Utilities/StateRepo.cy";

describe("Multilingual State Validation", () => {
  const expectedStates = StateRepo.getExpectedStates();

  // Tyre Pages
  const TyrePageUrls = {
    english: `${Cypress.env('url')}tyres/`,
    hindi: `${Cypress.env('url')}hi/tyres/`,
    marathi: `${Cypress.env('url')}mr/tyres/`,
    tamil: `${Cypress.env('url')}ta/tyres/`,
    telugu: `${Cypress.env('url')}te/tyres/`,
  };

// Tyre Grid on Product Detail Page
  const TyreGridUrls = {
    english: `${Cypress.env('url')}massey-ferguson-tractor/7250-power-up/`,
    hindi: `${Cypress.env('url')}hi/massey-ferguson-tractor/7250-power-up/`,
    marathi: `${Cypress.env('url')}mr/massey-ferguson-tractor/7250-power-up/`,
    tamil: `${Cypress.env('url')}ta/massey-ferguson-tractor/7250-power-up/`,
    telugu: `${Cypress.env('url')}te/massey-ferguson-tractor/7250-power-up/`,
  };

  // Reusable function for main page
  const validateStatesMainPage = (pageUrl, languageKey, expectedStates) => {
    cy.visit(pageUrl);
    cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
    cy.get('#statesid2').should('be.visible');

    // Wait for the state options to load
    cy.intercept('GET', '**/newsletterstate*').as('loadStates');
    // cy.wait('@loadStates', { timeout: 20000 });

    // Validate the number of states excluding the placeholder
    cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

    // Validate state names and log mismatches
    let mismatches = [];
    cy.get('#statesid2 option').not(':first').each(($option, index) => {
      const actual = $option.text().trim();
      const expected = expectedStates[index]?.[languageKey];
      if (actual !== expected) mismatches.push({ index, actual, expected });
    }).then(() => {
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
    cy.get(':nth-child(1) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
    // cy.get('#statesid2').should('be.visible');
  
    // Intercept the route with wildcard to match any variations in the URL
    cy.intercept('GET', '**/newsletterstate*').as('loadStates');

    // Validate the number of states excluding the placeholder
    cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

    // Validate state names and log mismatches
    let mismatches = [];
    cy.get('#statesid2 option').not(':first').each(($option, index) => {
      const actual = $option.text().trim();
      const expected = expectedStates[index]?.[languageKey];
      if (actual !== expected) mismatches.push({ index, actual, expected });
    }).then(() => {
      if (mismatches.length) {
        cy.log('Mismatched States:', mismatches);
        throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
      } else {
        cy.log(`All states are matched accurately in ${languageKey}!`);
      }
    });
  };

  // Test cases for Tyre Pages

  describe("Tyre Pages - State Validation", () => {
    it("1. Validate State Names in English (Tyre Pages)", () => {
      validateStatesMainPage(TyrePageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Tyre Pages)", () => {
      validateStatesMainPage(TyrePageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Tyre Pages)", () => {
      validateStatesMainPage(TyrePageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Tyre Pages)", () => {
      validateStatesMainPage(TyrePageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Tyre Pages)", () => {
      validateStatesMainPage(TyrePageUrls.telugu, 'telugu', expectedStates);
    });
  });


  // Test cases for Tyre Grid on Product Detail Page

  describe("Tyre Grid - State Validation", () => {
    it("6. Validate State Names in English (Tyre Grid: PDP)", () => {
      validateStatesGridPage(TyreGridUrls.english, 'english', expectedStates);
    });

    it("7. Validate State Names in Hindi (Tyre Grid: PDP)", () => {
      validateStatesGridPage(TyreGridUrls.hindi, 'hindi', expectedStates);
    });

    it("8. Validate State Names in Marathi (Tyre Grid: PDP)", () => {
      validateStatesGridPage(TyreGridUrls.marathi, 'marathi', expectedStates);
    });

    it("9. Validate State Names in Tamil (Tyre Grid: PDP)", () => {
      validateStatesGridPage(TyreGridUrls.tamil, 'tamil', expectedStates);
    });

    it("10. Validate State Names in Telugu (Tyre Grid: PDP)", () => {
      validateStatesGridPage(TyreGridUrls.telugu, 'telugu', expectedStates);
    });
  });
});
