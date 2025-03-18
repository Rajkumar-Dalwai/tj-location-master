/// <reference types="cypress" />

import ManipurVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/ManipurVsDistrictsRepo.cy";
import MeghalayaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/MeghalayaVsDistrictsRepo.cy";
import MizoramVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/MizoramVsDistrictsRepo.cy";
import NagalandVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/NagalandVsDistrictsRepo.cy";
import PuducherryVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/PuducherryVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedManipurDistricts = ManipurVsDistrictsRepo.getExpectedManipurDistricts();
  const ExpectedMeghalayaDistricts = MeghalayaVsDistrictsRepo.getExpectedMeghalayaDistricts();
  const ExpectedMizoramDistricts = MizoramVsDistrictsRepo.getExpectedMizoramDistricts();
  const ExpectedNagalandDistricts = NagalandVsDistrictsRepo.getExpectedNagalandDistricts();
  const ExpectedPuducherryDistricts = PuducherryVsDistrictsRepo.getExpectedPuducherryDistricts();

// Sell Used Pages
const SellPageUrls = {
  english: `${Cypress.env('url')}sell/farm-implements/`,
  hindi: `${Cypress.env('url')}hi/sell/farm-implements/`,
  marathi: `${Cypress.env('url')}mr/sell/farm-implements/`,
  tamil: `${Cypress.env('url')}ta/sell/farm-implements/`,
  telugu: `${Cypress.env('url')}te/sell/farm-implements/`,
};

  const validateDistrictsMainPageForSell = (pageUrl, languageKey, stateName, expectedDistrictsForSell) => {
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

    // Select the state from the dropdown
    cy.get('.row > :nth-child(3) > .form-group > .form-control').should('be.visible').select(stateName);
    cy.wait(2000);

    // Verify the district options length
    cy.get(':nth-child(4) > .form-group > .form-control')
        .find('option')
        .not(':first')
        .should('have.length', expectedDistrictsForSell.length);

    let orderMismatches = [];
    let spellingMismatches = [];

    // Iterate over district options to validate order and spelling
    cy.get(':nth-child(4) > .form-group > .form-control')
        .find('option')
        .not(':first')
        .each(($option, index) => {
            const actual = $option.text().trim();
            const expected = expectedDistrictsForSell[index]?.[languageKey]?.trim();

            if (actual !== expected) {
                if (expectedDistrictsForSell.some(d => d[languageKey] === actual)) {
                    orderMismatches.push({ index, actual, expected });
                } else {
                    spellingMismatches.push({ index, actual, expected });
                }
            }
        })
        .then(() => {
            // Log order mismatches with detailed information
            if (orderMismatches.length) {
                cy.log('❌ Order Mismatched Districts:');
                orderMismatches.forEach(mismatch => {
                    const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                    cy.log(logMessage); // Cypress log
                    console.error(logMessage); // Terminal log
                });
            } else {
                cy.log('✅ No order mismatches found.');
            }

            // Log spelling mismatches with detailed information
            if (spellingMismatches.length) {
                cy.log('❌ Spelling Mismatched Districts:');
                spellingMismatches.forEach(mismatch => {
                    const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                    cy.log(logMessage); // Cypress log
                    console.error(logMessage); // Terminal log
                });

                // Throwing a detailed error to make the failure clear
                throw new Error(
                    `District validation failed due to spelling mismatches.\n` +
                    spellingMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
                );
            } else {
                cy.log(`✅ All districts are matched accurately in ${languageKey}!`);
            }
        });
};


  // Test cases
  describe("Sell Used Pages - Manipur District Validation", () => {
    it("1. Validate Manipur District Names in English (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.english, 'english', 'Manipur', ExpectedManipurDistricts);
    });

    it("2. Validate Manipur District Names in Hindi (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.hindi, 'hindi', 'मणिपुर', ExpectedManipurDistricts);
    });

    it("3. Validate Manipur District Names in Marathi (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.marathi, 'marathi', 'मणिपूर', ExpectedManipurDistricts);
    });

    it("4. Validate Manipur District Names in Tamil (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.tamil, 'tamil', 'மணிப்பூர்', ExpectedManipurDistricts);
    });

    it("5. Validate Manipur District Names in Telugu (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.telugu, 'telugu', 'మణిపూర్', ExpectedManipurDistricts);
    });
  });

   describe("Sell Used Pages - Meghalaya District Validation", () => {
    it("6. Validate Meghalaya District Names in English (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.english, 'english', 'Meghalaya', ExpectedMeghalayaDistricts);
    });

    it("7. Validate Meghalaya District Names in Hindi (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.hindi, 'hindi', 'मेघालय', ExpectedMeghalayaDistricts);
    });

    it("8. Validate Meghalaya District Names in Marathi (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.marathi, 'marathi', 'मेघालय', ExpectedMeghalayaDistricts);
    });

    it("9. Validate Meghalaya District Names in Tamil (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.tamil, 'tamil', 'மேகாலயா', ExpectedMeghalayaDistricts);
    });

    it("10. Validate Meghalaya District Names in Telugu (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.telugu, 'telugu', 'మేఘాలయ', ExpectedMeghalayaDistricts);
    });
  });

 describe("Sell Used Pages - Mizoram District Validation", () => {
    it("11. Validate Mizoram District Names in English (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.english, 'english', 'Mizoram', ExpectedMizoramDistricts);
    });

    it("12. Validate Mizoram District Names in Hindi (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.hindi, 'hindi', 'मिजोरम', ExpectedMizoramDistricts);
    });

    it("13. Validate Mizoram District Names in Marathi (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.marathi, 'marathi', 'मिझोराम', ExpectedMizoramDistricts);
    });

    it("14. Validate Mizoram District Names in Tamil (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.tamil, 'tamil', 'மிசோரம்', ExpectedMizoramDistricts);
    });

    it("15. Validate Mizoram District Names in Telugu (Sell Used Pages)", () => {
      validateDistrictsMainPageForSell(SellPageUrls.telugu, 'telugu', 'మిజోరం', ExpectedMizoramDistricts);
    });
});

describe("Sell Used Pages - Nagaland District Validation", () => {
  it("16. Validate Nagaland District Names in English (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.english, 'english', 'Nagaland', ExpectedNagalandDistricts);
  });

  it("17. Validate Nagaland District Names in Hindi (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.hindi, 'hindi', 'नागालैंड', ExpectedNagalandDistricts);
  });

  it("18. Validate Nagaland District Names in Marathi (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.marathi, 'marathi', 'नागालँड', ExpectedNagalandDistricts);
  });

  it("19. Validate Nagaland District Names in Tamil (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.tamil, 'tamil', 'நாகாலாந்து', ExpectedNagalandDistricts);
  });

  it("20. Validate Nagaland District Names in Telugu (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.telugu, 'telugu', 'నాగాలాండ్', ExpectedNagalandDistricts);
  });
});

describe("Sell Used Pages - Puducherry District Validation", () => {
  it("21. Validate Puducherry District Names in English (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.english, 'english', 'Puducherry', ExpectedPuducherryDistricts);
  });

  it("22. Validate Puducherry District Names in Hindi (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.hindi, 'hindi', 'पुदुचेरी', ExpectedPuducherryDistricts);
  });

  it("23. Validate Puducherry District Names in Marathi (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.marathi, 'marathi', 'पुद्दुचेरी', ExpectedPuducherryDistricts);
  });

  it("24. Validate Puducherry District Names in Tamil (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.tamil, 'tamil', 'புதுச்சேரி', ExpectedPuducherryDistricts);
  });

  it("25. Validate Puducherry District Names in Telugu (Sell Used Pages)", () => {
    validateDistrictsMainPageForSell(SellPageUrls.telugu, 'telugu', 'పుదుచ్చేరి', ExpectedPuducherryDistricts);
  });
});

});
