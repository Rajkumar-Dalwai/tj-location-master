/// <reference types="cypress" />

import RangareddyVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/RangareddyVsTehsilsRepo.cy";
import VaishaliVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/VaishaliVsTehsilsRepo.cy";
import KadapaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/KadapaVsTehsilsRepo.cy";
import HubliVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/HubliVsTehsilsRepo.cy";
import ChapraVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/ChapraVsTehsilsRepo.cy";


describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedRangareddyTehsils = RangareddyVsTehsilsRepo.getExpectedRangareddyTehsils();
  const ExpectedVaishaliTehsils = VaishaliVsTehsilsRepo.getExpectedVaishaliTehsils();
  const ExpectedKadapaTehsils = KadapaVsTehsilsRepo.getExpectedKadapaTehsils();
  const ExpectedHubliTehsils = HubliVsTehsilsRepo.getExpectedHubliTehsils();
  const ExpectedChapraTehsils = ChapraVsTehsilsRepo.getExpectedChapraTehsils();

// Sell Used Pages
const SellPageUrls = {
  english: `${Cypress.env('url')}sell/farm-implements/`,
  hindi: `${Cypress.env('url')}hi/sell/farm-implements/`,
  marathi: `${Cypress.env('url')}mr/sell/farm-implements/`,
  tamil: `${Cypress.env('url')}ta/sell/farm-implements/`,
  telugu: `${Cypress.env('url')}te/sell/farm-implements/`,
};

 // Reusable function for Main Page

const validateTehsilsMainPageForSell = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForSell) => {
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

  // Select state and district from dropdowns
  cy.get('.row > :nth-child(3) > .form-group > .form-control').should('be.visible').select(stateName);
  cy.wait(2000);
  cy.get(':nth-child(4) > .form-group > .form-control').should('be.visible').select(districtName);
  cy.wait(2000);

  cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');

  // Validate the length of dropdown options excluding the first option
  cy.get(':nth-child(5) > .form-group > .form-control')
      .find('option')
      .not(':first')
      .should('have.length', expectedTehsilsForSell.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get(':nth-child(5) > .form-group > .form-control')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedTehsilsForSell[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedTehsilsForSell.some(t => t[languageKey] === actual)) {
                  orderMismatches.push({ index, actual, expected });
              } else {
                  spellingMismatches.push({ index, actual, expected });
              }
          }
      })
      .then(() => {
          if (orderMismatches.length) {
              cy.log('❌ Order Mismatched Tehsils:');
              orderMismatches.forEach(mismatch => {
                  const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                  cy.log(logMessage);
                  console.error(logMessage);
              });
          } else {
              cy.log('✅ No order mismatches found.');
          }

          if (spellingMismatches.length) {
              cy.log('❌ Spelling Mismatched Tehsils:');
              spellingMismatches.forEach(mismatch => {
                  const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                  cy.log(logMessage);
                  console.error(logMessage);
              });

              throw new Error(
                  `Tehsil validation failed due to spelling mismatches.\n` +
                  spellingMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
              );
          } else {
              cy.log(`✅ All Tehsils are matched accurately in ${languageKey}!`);
          }
      });
};

  // Test cases

 /* describe("Tractor Pages - Rangareddy Tehsil Validation", () => {
    it("1. Validate Rangareddy Tehsil Names in English (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.english, 'english','Telangana', 'Rangareddy', ExpectedRangareddyTehsils);
    });

    it("2. Validate Rangareddy Tehsil Names in Hindi (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.hindi, 'hindi', 'तेलंगाना','रंगारेड्डी', ExpectedRangareddyTehsils);
    });

    it("3. Validate Rangareddy Tehsil Names in Marathi (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.marathi, 'marathi', 'तेलंगणा','रंगा रेड्डी', ExpectedRangareddyTehsils);
    });

    it("4. Validate Rangareddy Tehsil Names in Tamil (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.tamil, 'tamil', 'தெலுங்கானா', 'ரங்கா ரெட்டி', ExpectedRangareddyTehsils);
    });

    it("5. Validate Rangareddy Tehsil Names in Telugu (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.telugu, 'telugu', 'తెలంగాణ', 'రంగా రెడ్డి', ExpectedRangareddyTehsils);
    }); 
  });*/

 describe("Tractor Pages - Vaishali Tehsil Validation", () => {
    it("6. Validate Vaishali Tehsil Names in English (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.english, 'english','Bihar', 'Vaishali', ExpectedVaishaliTehsils);
    });

    it("7. Validate Vaishali Tehsil Names in Hindi (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.hindi, 'hindi','बिहार', 'वैशाली', ExpectedVaishaliTehsils);
    });

    it("8. Validate Vaishali Tehsil Names in Marathi (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.marathi, 'marathi','बिहार', 'वैशाली', ExpectedVaishaliTehsils);
    });

    it("9. Validate Vaishali Tehsil Names in Tamil (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.tamil, 'tamil','பீகார்','வைஷாலி', ExpectedVaishaliTehsils);
    });

    it("10. Validate Vaishali Tehsil Names in Telugu (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.telugu, 'telugu','బీహార్', 'వైశాలి', ExpectedVaishaliTehsils);
    });
  });

  describe("Tractor Pages - Kadapa Tehsil Validation", () => {
    it("11. Validate Kadapa Tehsil Names in English (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.english, 'english','Andhra Pradesh', 'Kadapa', ExpectedKadapaTehsils);
    });

    it("12. Validate Kadapa Tehsil Names in Hindi (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.hindi, 'hindi','आंध्र प्रदेश', 'कडपा', ExpectedKadapaTehsils);
    });

    it("13. Validate Kadapa Tehsil Names in Marathi (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.marathi, 'marathi','आंध्र प्रदेश', 'कडप्पा', ExpectedKadapaTehsils);
    });

    it("14. Validate Kadapa Tehsil Names in Tamil (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.tamil, 'tamil','ஆந்திரப் பிரதேசம்', 'கடப்பா', ExpectedKadapaTehsils);
    });

    it("15. Validate Kadapa Tehsil Names in Telugu (Tractor Pages)", () => {
      validateTehsilsMainPageForSell(SellPageUrls.telugu, 'telugu','ఆంధ్రప్రదేశ్', 'కడప', ExpectedKadapaTehsils);
    });
});

describe("Tractor Pages - Hubli Tehsil Validation", () => {
 it("16. Validate Hubli Tehsil Names in English (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.english, 'english','Karnataka', 'Hubli', ExpectedHubliTehsils);
  });

  it("17. Validate Hubli Tehsil Names in Hindi (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.hindi, 'hindi','कर्नाटक', 'हुबली', ExpectedHubliTehsils);
  });

  it("18. Validate Hubli Tehsil Names in Marathi (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.marathi, 'marathi','कर्नाटक', 'हुबळी', ExpectedHubliTehsils);
  });

  it("19. Validate Hubli Tehsil Names in Tamil (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.tamil, 'tamil','கர்நாடகா', 'ஹூப்ளி', ExpectedHubliTehsils);
  });

  it("20. Validate Hubli Tehsil Names in Telugu (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.telugu, 'telugu','కర్ణాటక', 'హుబ్లీ', ExpectedHubliTehsils);
  });
});

describe("Tractor Pages - Chapra Tehsil Validation", () => {
  it("21. Validate Chapra Tehsil Names in English (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.english, 'english','Bihar', 'Chapra', ExpectedChapraTehsils);
  });

  it("22. Validate Chapra Tehsil Names in Hindi (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.hindi, 'hindi','बिहार', 'छपरा', ExpectedChapraTehsils);
  });

  it("23. Validate Chapra Tehsil Names in Marathi (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.marathi, 'marathi','बिहार', 'छपरा', ExpectedChapraTehsils);
  });

  it("24. Validate Chapra Tehsil Names in Tamil (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.tamil, 'tamil','பீகார்', 'சாப்ரா', ExpectedChapraTehsils);
  });

  it("25. Validate Chapra Tehsil Names in Telugu (Tractor Pages)", () => {
    validateTehsilsMainPageForSell(SellPageUrls.telugu, 'telugu','బీహార్', 'చాప్రా', ExpectedChapraTehsils);
  });
});

});
