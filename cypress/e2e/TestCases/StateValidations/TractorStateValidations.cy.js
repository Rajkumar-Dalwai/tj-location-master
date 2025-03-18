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

  // Tractor Pages
  const TractorPageUrls = {
    english: `${Cypress.env('url')}all-brands/`,
    hindi: `${Cypress.env('url')}hi/all-brands/`,
    marathi: `${Cypress.env('url')}mr/all-brands/`,
    tamil: `${Cypress.env('url')}ta/all-brands/`,
    telugu: `${Cypress.env('url')}te/all-brands/`,
  };

// Tractor Grid on Home Page
  const TractorGridUrls = {
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
  cy.get('#mahindranew > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate')
      .first()
      .click();
  cy.wait(2000);

  // Intercept the state options API
  cy.intercept('GET', '**/newsletterstate*').as('loadStates');

  // Validate the number of states excluding the placeholder
  cy.get('#states')
      .find('option')
      .not(':first')
      .should('have.length', expectedStates.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  // Iterate over state options to validate order and spelling
  cy.get('#states')
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

// Reusable function for Grid page
const validateStatesGridPage = (pageUrl, languageKey, expectedStates) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  cy.get('#popularnew > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate')
      .click();

  cy.intercept('GET', '**/newsletterstate*').as('loadStates');

  cy.get('#states')
      .find('option')
      .not(':first')
      .should('have.length', expectedStates.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get('#states')
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

  // Test cases for Tractor Pages

  describe("Tractor Pages - State Validation", () => {
    it("1. Validate State Names in English (Tractor Pages)", () => {
      validateStatesMainPage(TractorPageUrls.english, 'english', expectedStates);
    });

    it("2. Validate State Names in Hindi (Tractor Pages)", () => {
      validateStatesMainPage(TractorPageUrls.hindi, 'hindi', expectedStates);
    });

    it("3. Validate State Names in Marathi (Tractor Pages)", () => {
      validateStatesMainPage(TractorPageUrls.marathi, 'marathi', expectedStates);
    });

    it("4. Validate State Names in Tamil (Tractor Pages)", () => {
      validateStatesMainPage(TractorPageUrls.tamil, 'tamil', expectedStates);
    });

    it("5. Validate State Names in Telugu (Tractor Pages)", () => {
      validateStatesMainPage(TractorPageUrls.telugu, 'telugu', expectedStates);
    });
  });

  // Test cases for Tractor Grid on Home Page

  describe("Tractor Grid - State Validation", () => {
    it("6. Validate State Names in English (Tractor Grid: HP)", () => {
      validateStatesGridPage(TractorGridUrls.english, 'english', expectedStates);
    });

    it("7. Validate State Names in Hindi (Tractor Grid: HP)", () => {
      validateStatesGridPage(TractorGridUrls.hindi, 'hindi', expectedStates);
    });

    it("8. Validate State Names in Marathi (Tractor Grid: HP)", () => {
      validateStatesGridPage(TractorGridUrls.marathi, 'marathi', expectedStates);
    });

    it("9. Validate State Names in Tamil (Tractor Grid: HP)", () => {
      validateStatesGridPage(TractorGridUrls.tamil, 'tamil', expectedStates);
    });

    it("10. Validate State Names in Telugu (Tractor Grid: HP)", () => {
      validateStatesGridPage(TractorGridUrls.telugu, 'telugu', expectedStates);
    });
  });
});
