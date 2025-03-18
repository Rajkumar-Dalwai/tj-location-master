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

  // Sell Used Pages
  const SellPageUrls = {
    english: `${Cypress.env('url')}sell/farm-implements/`,
    hindi: `${Cypress.env('url')}hi/sell/farm-implements/`,
    marathi: `${Cypress.env('url')}mr/sell/farm-implements/`,
    tamil: `${Cypress.env('url')}ta/sell/farm-implements/`,
    telugu: `${Cypress.env('url')}te/sell/farm-implements/`,
  };

// Reusable function for main page
const validateStatesMainPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  cy.get('.col-12 > .form-group > .form-control').select("56");
  cy.get(':nth-child(2) > .form-group > .form-control').select("79");
  cy.get('#model_name').type("Testqa");
  cy.get(':nth-child(4) > .form-group > .form-control').select("2024");
  cy.get('fieldset.ng-scope > .form-submit-btn').click();

  cy.get('.col-12 > .form-group > .form-control').type("Testqa");
  cy.get('.input-group > .form-control').type("50000");
  cy.get('.row > :nth-child(3) > .form-group > .form-control').type("Testqa");
  cy.get('.ng-scope > .form-submit-btn').click();
  cy.get('#fileField0').selectFile('cypress/fixtures/atlassian.png', { force: true });
  cy.wait(2000);
  cy.get('#fileField1').selectFile('cypress/fixtures/atlassian.png', { force: true });
  cy.wait(2000);
  cy.get('fieldset.ng-scope > .form-submit-btn').click();

  // Intercept the state options API
  cy.intercept('GET', '**/newsletterstate*').as('loadStates');

  // Validate the number of states excluding the placeholder
  cy.get('.row > :nth-child(3) > .form-group > .form-control')
      .find('option')
      .not(':first')
      .should('have.length', expectedStates.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  // Iterate over state options to validate order and spelling
  cy.get('.row > :nth-child(3) > .form-group > .form-control')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedStates[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedStates.some(d => d[languageKey] === actual)) {
                  orderMismatches.push({ index, actual, expected });
              } else {
                  spellingMismatches.push({ index, actual, expected });
              }
          }
      })
      .then(() => {
          // Log order mismatches
          if (orderMismatches.length) {
              cy.log('❌ Order Mismatched States:');
              orderMismatches.forEach(mismatch => {
                  const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                  cy.log(logMessage);
                  console.error(logMessage);
              });
          } else {
              cy.log('✅ No order mismatches found.');
          }

          // Log spelling mismatches
          if (spellingMismatches.length) {
              cy.log('❌ Spelling Mismatched States:');
              spellingMismatches.forEach(mismatch => {
                  const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                  cy.log(logMessage);
                  console.error(logMessage);
              });
              throw new Error(`State validation failed due to spelling mismatches.\n` +
                  spellingMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
              );
          } else {
              cy.log(`✅ All states are matched accurately in ${languageKey}!`);
          }
      });
};

  // Test cases for Sell Used Pages

  describe("Sell Used Pages - State Validation", () => {
    it("1. Validate State Names in English (Sell Used Pages)", () => {
      validateStatesMainPage(SellPageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Sell Used Pages)", () => {
      validateStatesMainPage(SellPageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Sell Used Pages)", () => {
      validateStatesMainPage(SellPageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Sell Used Pages)", () => {
      validateStatesMainPage(SellPageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Sell Used Pages)", () => {
      validateStatesMainPage(SellPageUrls.telugu, 'telugu', expectedStates);
    });
  });

});














