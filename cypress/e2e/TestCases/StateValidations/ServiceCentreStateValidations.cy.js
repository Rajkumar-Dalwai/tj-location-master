/// <reference types="cypress" />

import StateRepo from "../../Reusable-Utilities/StateRepo.cy";

describe("Multilingual State Validation", () => {
  const expectedStates = StateRepo.getExpectedStates();

  // Service Centre
  const ServiceCentrePageUrls = {
    english: `${Cypress.env('url')}tractor-service-centers/satara/`,
    hindi: `${Cypress.env('url')}hi/tractor-service-centers/satara/`,
    marathi: `${Cypress.env('url')}mr/tractor-service-centers/satara/`,
    tamil: `${Cypress.env('url')}ta/tractor-service-centers/satara/`,
    telugu: `${Cypress.env('url')}te/tractor-service-centers/satara/`,
  };

// Service Centre Grid on Brand listing page
  const ServiceCentreGridUrls = {
    english: `${Cypress.env('url')}massey-ferguson-tractor/`,
    hindi: `${Cypress.env('url')}hi/massey-ferguson-tractor/`,
    marathi: `${Cypress.env('url')}mr/massey-ferguson-tractor/`,
    tamil: `${Cypress.env('url')}ta/massey-ferguson-tractor/`,
    telugu: `${Cypress.env('url')}te/massey-ferguson-tractor/`,
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
    cy.get('.filter-img1', { timeout: 15000 }).should('be.visible').click();
    cy.wait(2000);
    cy.get('#service-tab').click();
    cy.wait(2000);
    cy.get('#service > .tractor-new-reviews > :nth-child(1) > .bg-color-white > .new-equipment-anchor').click();
  
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

  // Test cases for Service Centre

  describe("Service Centre - State Validation", () => {
    it("1. Validate State Names in English (Service Centre)", () => {
      validateStatesMainPage(ServiceCentrePageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Service Centre)", () => {
      validateStatesMainPage(ServiceCentrePageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Service Centre)", () => {
      validateStatesMainPage(ServiceCentrePageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Service Centre)", () => {
      validateStatesMainPage(ServiceCentrePageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Service Centre)", () => {
      validateStatesMainPage(ServiceCentrePageUrls.telugu, 'telugu', expectedStates);
    });
  });

  // Test cases for Service Centre Grid on Brand listing page

  describe("Service Centre Grid - State Validation", () => {
    it("6. Validate State Names in English (Service Centre Grid: BLP)", () => {
      validateStatesGridPage(ServiceCentreGridUrls.english, 'english', expectedStates);
    });

    it("7. Validate State Names in Hindi (Service Centre Grid: BLP)", () => {
      validateStatesGridPage(ServiceCentreGridUrls.hindi, 'hindi', expectedStates);
    });

    it("8. Validate State Names in Marathi (Service Centre Grid: BLP)", () => {
      validateStatesGridPage(ServiceCentreGridUrls.marathi, 'marathi', expectedStates);
    });

    it("9. Validate State Names in Tamil (Service Centre Grid: BLP)", () => {
      validateStatesGridPage(ServiceCentreGridUrls.tamil, 'tamil', expectedStates);
    });

    it("10. Validate State Names in Telugu (Service Centre Grid: BLP)", () => {
      validateStatesGridPage(ServiceCentreGridUrls.telugu, 'telugu', expectedStates);
    });
  });
});
