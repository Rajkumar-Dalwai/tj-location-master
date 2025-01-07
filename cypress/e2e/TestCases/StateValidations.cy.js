/// <reference types="cypress" />

import StateRepo from "../Reusable-Utilities/StateRepo.cy";

describe("Multilingual State Validation", () => {
  const expectedStates = StateRepo.getExpectedStates();

  // Tyre Pages

//   it("1.Validate State Names in English (Tyre Pages)", () => {
//     cy.visit(`${Cypress.env('url')}tyres/`);
//     cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//     cy.get('#statesid2').should('be.visible');

//     // Wait for the state options to load
//     cy.intercept('GET', '/ajax/newsletterstate').as('loadStates');
//     cy.wait('@loadStates');

//     // Validate the number of states excluding the placeholder
//     cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

//     // Validate state names and log mismatches
//     let mismatches = [];
//     cy.get('#statesid2 option').not(':first').each(($option, index) => {
//       const actual = $option.text().trim();
//       const expected = expectedStates[index]?.english;
//       if (actual !== expected) mismatches.push({ index, actual, expected });
//     }).then(() => {
//       if (mismatches.length) {
//         cy.log('Mismatched States:', mismatches);
//         throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//       } else {
//         cy.log('All states are matched accurately in English!');
//       }
//     });
//   });


//   it("2.Validate State Names in Hindi (Tyre Pages)", () => {
//     cy.visit(`${Cypress.env('url')}hi/tyres`);
//     cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//     cy.get('#statesid2').should('be.visible');
  
//     // Intercept the route with wildcard to match any variations in the URL
//     cy.intercept('GET', '**/newsletterstate*').as('loadStates');
    
//     // Wait for the state options to load with an increased timeout
//     cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//       console.log('Intercepted request:', interception);
//     });
  
//     // Validate the number of states excluding the placeholder
//     cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);
  
//     // Validate state names and log mismatches
//     let mismatches = [];
//     cy.get('#statesid2 option').not(':first').each(($option, index) => {
//       const actual = $option.text().trim();
//       const expected = expectedStates[index]?.hindi; // Assuming the Hindi names are in `expectedStates.hindi`
//       if (actual !== expected) mismatches.push({ index, actual, expected });
//     }).then(() => {
//       if (mismatches.length) {
//         cy.log('Mismatched States:', mismatches);
//         throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//       } else {
//         cy.log('All states are matched accurately in Hindi!');
//       }
//     });
//   });
  
//  it("3.Validate State Names in Tamil (Tyre Pages)", () => {
//     cy.visit(`${Cypress.env('url')}ta/tyres/`);
//     cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//     cy.get('#statesid2').should('be.visible');
  
//     // Intercept the route with wildcard to match any variations in the URL
//     cy.intercept('GET', '**/newsletterstate*').as('loadStates');
    
//     // Wait for the state options to load with an increased timeout
//     cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//       console.log('Intercepted request:', interception);
//     });
  
//     // Validate the number of states excluding the placeholder
//     cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);
  
//     // Validate state names and log mismatches
//     let mismatches = [];
//     cy.get('#statesid2 option').not(':first').each(($option, index) => {
//       const actual = $option.text().trim();
//       const expected = expectedStates[index]?.tamil; // Assuming the Hindi names are in `expectedStates.hindi`
//       if (actual !== expected) mismatches.push({ index, actual, expected });
//     }).then(() => {
//       if (mismatches.length) {
//         cy.log('Mismatched States:', mismatches);
//         throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//       } else {
//         cy.log('All states are matched accurately in Tamil!');
//       }
//     });
//   });

//   it("4.Validate State Names in Telugu (Tyre Pages)", () => {
//     cy.visit(`${Cypress.env('url')}te/tyres/`);
//     cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//     cy.get('#statesid2').should('be.visible');
  
//     // Intercept the route with wildcard to match any variations in the URL
//     cy.intercept('GET', '**/newsletterstate*').as('loadStates');
    
//     // Wait for the state options to load with an increased timeout
//     cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//       console.log('Intercepted request:', interception);
//     });
  
//     // Validate the number of states excluding the placeholder
//     cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);
  
//     // Validate state names and log mismatches
//     let mismatches = [];
//     cy.get('#statesid2 option').not(':first').each(($option, index) => {
//       const actual = $option.text().trim();
//       const expected = expectedStates[index]?.telugu; // Assuming the Hindi names are in `expectedStates.hindi`
//       if (actual !== expected) mismatches.push({ index, actual, expected });
//     }).then(() => {
//       if (mismatches.length) {
//         cy.log('Mismatched States:', mismatches);
//         throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//       } else {
//         cy.log('All states are matched accurately in Telugu!');
//       }
//     });
//   });

//   it("5.Validate State Names in Marathi (Tyre Pages)", () => {
//     cy.visit(`${Cypress.env('url')}mr/tyres/`);
//     cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//     cy.get('#statesid2').should('be.visible');
  
//     // Intercept the route with wildcard to match any variations in the URL
//     cy.intercept('GET', '**/newsletterstate*').as('loadStates');
    
//     // Wait for the state options to load with an increased timeout
//     cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//       console.log('Intercepted request:', interception);
//     });
  
//     // Validate the number of states excluding the placeholder
//     cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);
  
//     // Validate state names and log mismatches
//     let mismatches = [];
//     cy.get('#statesid2 option').not(':first').each(($option, index) => {
//       const actual = $option.text().trim();
//       const expected = expectedStates[index]?.marathi; // Assuming the Hindi names are in `expectedStates.hindi`
//       if (actual !== expected) mismatches.push({ index, actual, expected });
//     }).then(() => {
//       if (mismatches.length) {
//         cy.log('Mismatched States:', mismatches);
//         throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//       } else {
//         cy.log('All states are matched accurately in Marathi!');
//       }
//     });
//   });

// Tyre Grid on Product detail Page

it("6.Validate State Names in English (Tyre Grid: PDP)", () => {
  cy.visit(`${Cypress.env('url')}massey-ferguson-tractor/7250-power-up/`);
  cy.scrollTo('bottom', { duration: 5000 });
  cy.get('.cross', { timeout: 15000 }).should('be.visible').click();
  cy.wait(2000);
  cy.get(':nth-child(1) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
  cy.get('#statesid2').should('be.visible');

  // Wait for the state options to load
  cy.intercept('GET', '/ajax/newsletterstate').as('loadStates');
  cy.wait('@loadStates');

  // Validate the number of states excluding the placeholder
  cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

  // Validate state names and log mismatches
  let mismatches = [];
  cy.get('#statesid2 option').not(':first').each(($option, index) => {
    const actual = $option.text().trim();
    const expected = expectedStates[index]?.english;
    if (actual !== expected) mismatches.push({ index, actual, expected });
  }).then(() => {
    if (mismatches.length) {
      cy.log('Mismatched States:', mismatches);
      throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
    } else {
      cy.log('All states are matched accurately in English!');
    }
  });
});


// it("7.Validate State Names in Hindi (Tyre Grid: PDP))", () => {
//   cy.visit(`${Cypress.env('url')}hi/massey-ferguson-tractor/7250-power-up/`);
//   cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//   cy.get('#statesid2').should('be.visible');

//   // Intercept the route with wildcard to match any variations in the URL
//   cy.intercept('GET', '**/newsletterstate*').as('loadStates');
  
//   // Wait for the state options to load with an increased timeout
//   cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//     console.log('Intercepted request:', interception);
//   });

//   // Validate the number of states excluding the placeholder
//   cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

//   // Validate state names and log mismatches
//   let mismatches = [];
//   cy.get('#statesid2 option').not(':first').each(($option, index) => {
//     const actual = $option.text().trim();
//     const expected = expectedStates[index]?.hindi; // Assuming the Hindi names are in `expectedStates.hindi`
//     if (actual !== expected) mismatches.push({ index, actual, expected });
//   }).then(() => {
//     if (mismatches.length) {
//       cy.log('Mismatched States:', mismatches);
//       throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//     } else {
//       cy.log('All states are matched accurately in Hindi!');
//     }
//   });
// });

// it("8.Validate State Names in Tamil (Tyre Grid: PDP))", () => {
//   cy.visit(`${Cypress.env('url')}ta/massey-ferguson-tractor/7250-power-up/`);
//   cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//   cy.get('#statesid2').should('be.visible');

//   // Intercept the route with wildcard to match any variations in the URL
//   cy.intercept('GET', '**/newsletterstate*').as('loadStates');
  
//   // Wait for the state options to load with an increased timeout
//   cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//     console.log('Intercepted request:', interception);
//   });

//   // Validate the number of states excluding the placeholder
//   cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

//   // Validate state names and log mismatches
//   let mismatches = [];
//   cy.get('#statesid2 option').not(':first').each(($option, index) => {
//     const actual = $option.text().trim();
//     const expected = expectedStates[index]?.tamil; // Assuming the Hindi names are in `expectedStates.hindi`
//     if (actual !== expected) mismatches.push({ index, actual, expected });
//   }).then(() => {
//     if (mismatches.length) {
//       cy.log('Mismatched States:', mismatches);
//       throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//     } else {
//       cy.log('All states are matched accurately in Tamil!');
//     }
//   });
// });

// it("9.Validate State Names in Telugu (Tyre Grid: PDP))", () => {
//   cy.visit(`${Cypress.env('url')}te/massey-ferguson-tractor/7250-power-up/`);
//   cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//   cy.get('#statesid2').should('be.visible');

//   // Intercept the route with wildcard to match any variations in the URL
//   cy.intercept('GET', '**/newsletterstate*').as('loadStates');
  
//   // Wait for the state options to load with an increased timeout
//   cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//     console.log('Intercepted request:', interception);
//   });

//   // Validate the number of states excluding the placeholder
//   cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

//   // Validate state names and log mismatches
//   let mismatches = [];
//   cy.get('#statesid2 option').not(':first').each(($option, index) => {
//     const actual = $option.text().trim();
//     const expected = expectedStates[index]?.telugu; // Assuming the Hindi names are in `expectedStates.hindi`
//     if (actual !== expected) mismatches.push({ index, actual, expected });
//   }).then(() => {
//     if (mismatches.length) {
//       cy.log('Mismatched States:', mismatches);
//       throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//     } else {
//       cy.log('All states are matched accurately in Telugu!');
//     }
//   });
// });

// it("10.Validate State Names in Marathi (Tyre Grid: PDP))", () => {
//   cy.visit(`${Cypress.env('url')}mr/massey-ferguson-tractor/7250-power-up/`);
//   cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
//   cy.get('#statesid2').should('be.visible');

//   // Intercept the route with wildcard to match any variations in the URL
//   cy.intercept('GET', '**/newsletterstate*').as('loadStates');
  
//   // Wait for the state options to load with an increased timeout
//   cy.wait('@loadStates', { timeout: 20000 }).then((interception) => {
//     console.log('Intercepted request:', interception);
//   });

//   // Validate the number of states excluding the placeholder
//   cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

//   // Validate state names and log mismatches
//   let mismatches = [];
//   cy.get('#statesid2 option').not(':first').each(($option, index) => {
//     const actual = $option.text().trim();
//     const expected = expectedStates[index]?.marathi; // Assuming the Hindi names are in `expectedStates.hindi`
//     if (actual !== expected) mismatches.push({ index, actual, expected });
//   }).then(() => {
//     if (mismatches.length) {
//       cy.log('Mismatched States:', mismatches);
//       throw new Error(`State validation failed. Mismatched states: ${JSON.stringify(mismatches)}`);
//     } else {
//       cy.log('All states are matched accurately in Marathi!');
//     }
//   });
// });






});