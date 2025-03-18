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

  // Used Pages
  const UsedPageUrls = {
    english: `${Cypress.env('url')}buy-used-tractor/`,
    hindi: `${Cypress.env('url')}hi/buy-used-tractor/`,
    marathi: `${Cypress.env('url')}mr/buy-used-tractor/`,
    tamil: `${Cypress.env('url')}ta/buy-used-tractor/`,
    telugu: `${Cypress.env('url')}te/buy-used-tractor/`,
  };

// Used Farm Implement Pages
  const UsedFarmImplementUrls = {
    english: `${Cypress.env('url')}used-implement/mahindra/2022/5914/`,
    hindi: `${Cypress.env('url')}hi/used-implement/mahindra/2022/5914/`,
    marathi: `${Cypress.env('url')}mr/used-implement/mahindra/2022/5914/`,
    tamil: `${Cypress.env('url')}ta/used-implement/mahindra/2022/5914/`,
    telugu: `${Cypress.env('url')}te/used-implement/mahindra/2022/5914/`,
  };

// Reusable function for main page
const validateStatesMainPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  // Intercept the state options API
  cy.intercept('GET', '**/newsletterstate*').as('loadStates');

  // Validate the number of states excluding the placeholder
  cy.get('#state_id')
      .find('option')
      .not(':first')
      .should('have.length', expectedStates.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  // Iterate over state options to validate order and spelling
  cy.get('#state_id')
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

// Reusable function for Other page
const validateStatesGridPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  cy.intercept('GET', '**/newsletterstate*').as('loadStates');

  cy.get('#inputState')
      .find('option')
      .not(':first')
      .should('have.length', expectedStates.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get('#inputState')
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

  // Test cases for Used Pages

  describe("Used Pages - State Validation", () => {
    it("1. Validate State Names in English (Used Pages)", () => {
      validateStatesMainPage(UsedPageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Used Pages)", () => {
      validateStatesMainPage(UsedPageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Used Pages)", () => {
      validateStatesMainPage(UsedPageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Used Pages)", () => {
      validateStatesMainPage(UsedPageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Used Pages)", () => {
      validateStatesMainPage(UsedPageUrls.telugu, 'telugu', expectedStates);
    });
  });

  // Test cases for Used Farm Implement Pages on Home Page

  describe("Used Farm Implement Pages - State Validation", () => {
    it("6. Validate State Names in English (Used Farm Implement Pages)", () => {
      validateStatesGridPage(UsedFarmImplementUrls.english, 'english', expectedStates);
    });

    it("7. Validate State Names in Hindi (Used Farm Implement Pages)", () => {
      validateStatesGridPage(UsedFarmImplementUrls.hindi, 'hindi', expectedStates);
    });

    it("8. Validate State Names in Marathi (Used Farm Implement Pages)", () => {
      validateStatesGridPage(UsedFarmImplementUrls.marathi, 'marathi', expectedStates);
    });

    it("9. Validate State Names in Tamil (Used Farm Implement Pages)", () => {
      validateStatesGridPage(UsedFarmImplementUrls.tamil, 'tamil', expectedStates);
    });

    it("10. Validate State Names in Telugu (Used Farm Implement Pages)", () => {
      validateStatesGridPage(UsedFarmImplementUrls.telugu, 'telugu', expectedStates);
    });
  });
});
