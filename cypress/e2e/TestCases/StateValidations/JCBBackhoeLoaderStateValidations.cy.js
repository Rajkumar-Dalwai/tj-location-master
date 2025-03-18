/// <reference types="cypress" />

import StateRepo from "../../Reusable-Utilities/StateRepo.cy";

describe("Multilingual State Validation", () => {
  const expectedStates = StateRepo.getExpectedStates();

  // JCB Backhoe Loader Page
  const JCBBackhoeLoaderUrls = {
    english: `${Cypress.env('url')}jcb-backhoe-loaders/`,
    hindi: `${Cypress.env('url')}hi/jcb-backhoe-loaders/`,
    marathi: `${Cypress.env('url')}mr/jcb-backhoe-loaders/`,
    tamil: `${Cypress.env('url')}ta/jcb-backhoe-loaders/`,
    telugu: `${Cypress.env('url')}te/jcb-backhoe-loaders/`,
  };

// Reusable function for main page
const validateStatesMainPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  // Wait for the state options to load using intercept
  cy.intercept('GET', '**/newsletterstate*').as('loadStates');
  // cy.wait('@loadStates', { timeout: 20000 });

  // Validate the number of states excluding the placeholder
  cy.get(':nth-child(3) > .form-group > #state')
    .find('option')
    .not(':first') // Skip the placeholder option
    .should('have.length', expectedStates.length);

  // Validate state names and log mismatches
  let mismatches = [];
  cy.get(':nth-child(3) > .form-group > #state')
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

  // Test cases for JCB Backhoe Loader Page

  describe("JCB Backhoe Loader Page - State Validation", () => {
    it("1. Validate State Names in English (JCB Backhoe Loader Page)", () => {
      validateStatesMainPage(JCBBackhoeLoaderUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (JCB Backhoe Loader Page)", () => {
      validateStatesMainPage(JCBBackhoeLoaderUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (JCB Backhoe Loader Page)", () => {
      validateStatesMainPage(JCBBackhoeLoaderUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (JCB Backhoe Loader Page)", () => {
      validateStatesMainPage(JCBBackhoeLoaderUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (JCB Backhoe Loader Page)", () => {
      validateStatesMainPage(JCBBackhoeLoaderUrls.telugu, 'telugu', expectedStates);
    });
  });
});
