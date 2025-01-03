/// <reference types="cypress" />

import StateRepo from "../Reusable-Utilities/StateRepo.cy";

describe("State Name Validation in Multiple Languages", () => {
  const expectedStates = StateRepo.getExpectedStates();

//   it("Validates state names in English", () => {
//     // Ensure the dropdown exists and is visible
//     cy.visit(Cypress.env('url') + 'tyres/');
//     cy.get('.container-mid > .section-css-slider > :nth-child(2) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
//     cy.get('#statesid2').should('be.visible').and('exist');
    
//     // Wait for the state options to load (using intercept if necessary)
//     cy.intercept('GET', '/ajax/newsletterstate').as('loadStates');
//     cy.wait('@loadStates');
    
//     // Ensure the dropdown options are populated correctly, excluding the "Select state" placeholder
//     cy.get('#statesid2 option').not(':first').should('have.length', expectedStates.length);

//     // Loop through the options and validate their text strictly
//     expectedStates.forEach((state, index) => {
//       cy.get(`#statesid2 option:nth-child(${index + 2})`) // Adjust for the first placeholder option
//         .should('have.text', state.english); // Ensure exact match
//     }); 
//   });

//   it("Validates state names in Hindi", () => {
//     let mismatchedStates = []; // Array to track mismatches
  
//     // Visit the page
//     cy.visit(Cypress.env('url') + 'hi/tyres/');
    
//     // Interact with the element to trigger state loading
//     cy.get('.container-mid > .section-css-slider > :nth-child(2) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
    
//     // Ensure the state dropdown exists and is visible
//     cy.get('#statesid2').should('be.visible').and('exist');
    
//     // Ensure the dropdown is populated with the expected number of states (excluding "Select state")
//     cy.get('#statesid2 option')
//       .not(':first') // Exclude the placeholder
//       .should('have.length', expectedStates.length); // Ensure the correct number of options

//       cy. wait(2000);
  
//     // Loop through each state in the dropdown
//     cy.get('#statesid2 option').not(':first').each(($el, index) => {
//       const actualState = $el.text().trim(); // Get the actual state text
//       const expectedState = expectedStates[index]?.hindi || "Missing State"; // Get the expected state text
  
//       // Compare actual and expected states
//       cy.wrap(null).then(() => {
//         if (actualState !== expectedState) {
//           mismatchedStates.push(`Mismatch: Expected "${expectedState}", but found "${actualState}"`);
//         }
//       });
//     }).then(() => {
//       // Log all mismatches at the end
//       if (mismatchedStates.length > 0) {
//         cy.log("Mismatched States:");
//         mismatchedStates.forEach(mismatch => {
//           cy.log(mismatch);
//         });
  
//         // Fail the test if there are mismatches
//         throw new Error(`State mismatches found: \n${mismatchedStates.join("\n")}`);
//       } else {
//         cy.log("All states matched successfully.");
//       }
//     });
//   });

// }); 


// it("Validates state names in Tamil", () => {
//   let mismatchedStates = []; // Array to track mismatches

//   // Select Tamil as the language
//   cy.get("[data-testid='language-selector']").select("Tamil");

//   // Click on the state dropdown
//   cy.get("[data-testid='state-dropdown']").should("be.visible").click();

//   // Ensure the dropdown is populated with the expected number of states
//   cy.get("[data-testid='state-option']")
//     .not(":first") // Exclude the placeholder
//     .should("have.length", expectedStates.length);

//   cy.wait(2000);

//   // Validate each state
//   cy.get("[data-testid='state-option']")
//     .not(":first")
//     .each(($el, index) => {
//       const actualState = $el.text().trim(); // Get the actual state text
//       const expectedState = expectedStates[index]?.tamil || "Missing State"; // Expected state text in Tamil

//       // Compare actual and expected states
//       cy.wrap(null).then(() => {
//         if (actualState !== expectedState) {
//           mismatchedStates.push(
//             `Mismatch: Expected "${expectedState}", but found "${actualState}"`
//           );
//         }
//       });
//     })
//     .then(() => {
//       // Log mismatches or success
//       if (mismatchedStates.length > 0) {
//         cy.log("Mismatched States:");
//         mismatchedStates.forEach((mismatch) => cy.log(mismatch));
//         throw new Error(`State mismatches found: \n${mismatchedStates.join("\n")}`);
//       } else {
//         cy.log("All states matched successfully.");
//       }
//     });
// });

// it("Validates state names in Telugu", () => {
//   let mismatchedStates = []; // Array to track mismatches

//   // Select Telugu as the language
//   cy.get("[data-testid='language-selector']").select("Telugu");

//   // Click on the state dropdown
//   cy.get("[data-testid='state-dropdown']").should("be.visible").click();

//   // Ensure the dropdown is populated with the expected number of states
//   cy.get("[data-testid='state-option']")
//     .not(":first")
//     .should("have.length", expectedStates.length);

//   cy.wait(2000);

//   // Validate each state
//   cy.get("[data-testid='state-option']")
//     .not(":first")
//     .each(($el, index) => {
//       const actualState = $el.text().trim();
//       const expectedState = expectedStates[index]?.telugu || "Missing State";

//       cy.wrap(null).then(() => {
//         if (actualState !== expectedState) {
//           mismatchedStates.push(
//             `Mismatch: Expected "${expectedState}", but found "${actualState}"`
//           );
//         }
//       });
//     })
//     .then(() => {
//       if (mismatchedStates.length > 0) {
//         cy.log("Mismatched States:");
//         mismatchedStates.forEach((mismatch) => cy.log(mismatch));
//         throw new Error(`State mismatches found: \n${mismatchedStates.join("\n")}`);
//       } else {
//         cy.log("All states matched successfully.");
//       }
//     });
// });

// it("Validates state names in Marathi", () => {
//   let mismatchedStates = []; // Array to track mismatches

//   // Select Marathi as the language
//   cy.get("[data-testid='language-selector']").select("Marathi");

//   // Click on the state dropdown
//   cy.get("[data-testid='state-dropdown']").should("be.visible").click();

//   // Ensure the dropdown is populated with the expected number of states
//   cy.get("[data-testid='state-option']")
//     .not(":first")
//     .should("have.length", expectedStates.length);

//   cy.wait(2000);

//   // Validate each state
//   cy.get("[data-testid='state-option']")
//     .not(":first")
//     .each(($el, index) => {
//       const actualState = $el.text().trim();
//       const expectedState = expectedStates[index]?.marathi || "Missing State";

//       cy.wrap(null).then(() => {
//         if (actualState !== expectedState) {
//           mismatchedStates.push(
//             `Mismatch: Expected "${expectedState}", but found "${actualState}"`
//           );
//         }
//       });
//     })
//     .then(() => {
//       if (mismatchedStates.length > 0) {
//         cy.log("Mismatched States:");
//         mismatchedStates.forEach((mismatch) => cy.log(mismatch));
//         throw new Error(`State mismatches found: \n${mismatchedStates.join("\n")}`);
//       } else {
//         cy.log("All states matched successfully.");
//       }
//     });
// });


describe('Lead : New Harvesters Suite', function() {
  
  it('TJWA_TC_LNH_001', function() {
      
    cy.visit(Cypress.env('url') + 'tyres/', { timeout: 10000 });
    cy.get('.container-mid > .section-css-slider > :nth-child(2) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
    cy.get('#statesid2').click();

  });

});

});