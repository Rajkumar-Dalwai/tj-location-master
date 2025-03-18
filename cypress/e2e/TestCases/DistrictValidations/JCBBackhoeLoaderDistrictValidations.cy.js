/// <reference types="cypress" />

import ChhattisgarhVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/ChhattisgarhVsDistrictsRepo.cy";
import DelhiVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/DelhiVsDistrictsRepo.cy";
import GoaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/GoaVsDistrictsRepo.cy";
import HaryanaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/HaryanaVsDistrictsRepo.cy";
import HimachalPradeshVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/HimachalPradeshVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedChhattisgarhDistricts = ChhattisgarhVsDistrictsRepo.getExpectedChhattisgarhDistricts();
  const ExpectedDelhiDistricts = DelhiVsDistrictsRepo.getExpectedDelhiDistricts();
  const ExpectedGoaDistricts = GoaVsDistrictsRepo.getExpectedGoaDistricts();
  const ExpectedHaryanaDistricts = HaryanaVsDistrictsRepo.getExpectedHaryanaDistricts();
  const ExpectedHimachalPradeshDistricts = HimachalPradeshVsDistrictsRepo.getExpectedHimachalPradeshDistricts();

  const JCBBackhoeLoaderUrls = {
    english: `${Cypress.env('url')}jcb-backhoe-loaders/`,
    hindi: `${Cypress.env('url')}hi/jcb-backhoe-loaders/`,
    marathi: `${Cypress.env('url')}mr/jcb-backhoe-loaders/`,
    tamil: `${Cypress.env('url')}ta/jcb-backhoe-loaders/`,
    telugu: `${Cypress.env('url')}te/jcb-backhoe-loaders/`,
  };

  // Reusable function for Main Page
  const validateDistrictsMainPage = (pageUrl, languageKey, stateName, expectedDistricts) => {
    cy.visit(pageUrl);
    cy.wait(2000);
    cy.get(':nth-child(3) > .form-group > #state').should('be.visible').select(stateName);
    cy.wait(2000);

    // cy.intercept('GET', '/ajax/get-districts/*').as('loadDistricts');
    // cy.wait('@loadDistricts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

    cy.get('#dist_id')
      .find('option')
      .not(':first')
      .should('have.length', expectedDistricts.length);

    let mismatches = [];
    cy.get('#dist_id')
      .find('option')
      .not(':first')
      .each(($option, index) => {
        const actual = $option.text().trim();
        const expected = expectedDistricts[index]?.[languageKey];
        if (actual !== expected) mismatches.push({ index, actual, expected });
      })
      .then(() => {
        if (mismatches.length) {
          cy.log('Mismatched Districts:', mismatches);
          throw new Error(`District validation failed. Mismatched districts: ${JSON.stringify(mismatches)}`);
        } else {
          cy.log(`All districts are matched accurately in ${languageKey}!`);
        }
      });
  };

  // Test cases
  describe("JCB Backhoe Loader Page - Chhattisgarh District Validation", () => {
    it("1. Validate Chhattisgarh District Names in English (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.english, 'english', 'Chhattisgarh', ExpectedChhattisgarhDistricts);
    });

   it("2. Validate Chhattisgarh District Names in Hindi (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.hindi, 'hindi', 'छत्तीसगढ', ExpectedChhattisgarhDistricts);
    });

    it("3. Validate Chhattisgarh District Names in Marathi (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.marathi, 'marathi', 'छत्तीसगड', ExpectedChhattisgarhDistricts);
    });

    it("4. Validate Chhattisgarh District Names in Tamil (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.tamil, 'tamil', 'சத்தீஸ்கர்', ExpectedChhattisgarhDistricts);
    });

    it("5. Validate Chhattisgarh District Names in Telugu (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.telugu, 'telugu', 'ఛత్తీస్‌గఢ్', ExpectedChhattisgarhDistricts);
    });
  });

   describe("JCB Backhoe Loader Page - Delhi District Validation", () => {
    it("6. Validate Delhi District Names in English (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.english, 'english', 'Delhi', ExpectedDelhiDistricts);
    });

    it("7. Validate Delhi District Names in Hindi (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.hindi, 'hindi', 'दिल्ली', ExpectedDelhiDistricts);
    });

    it("8. Validate Delhi District Names in Marathi (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.marathi, 'marathi', 'दिल्ली', ExpectedDelhiDistricts);
    });

    it("9. Validate Delhi District Names in Tamil (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.tamil, 'tamil', 'டெல்லி', ExpectedDelhiDistricts);
    });

    it("10. Validate Delhi District Names in Telugu (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.telugu, 'telugu', 'ఢిల్లీ', ExpectedDelhiDistricts);
    });
  });

  describe("JCB Backhoe Loader Page - Goa District Validation", () => {
    it("11. Validate Goa District Names in English (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.english, 'english', 'Goa', ExpectedGoaDistricts);
    });

    it("12. Validate Goa District Names in Hindi (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.hindi, 'hindi', 'गोवा', ExpectedGoaDistricts);
    });

    it("13. Validate Goa District Names in Marathi (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.marathi, 'marathi', 'गोवा', ExpectedGoaDistricts);
    });

    it("14. Validate Goa District Names in Tamil (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.tamil, 'tamil', 'கோவா', ExpectedGoaDistricts);
    });

    it("15. Validate Goa District Names in Telugu (JCB Backhoe Loader Page)", () => {
      validateDistrictsMainPage(JCBBackhoeLoaderUrls.telugu, 'telugu', 'గోవా', ExpectedGoaDistricts);
    });
});

describe("JCB Backhoe Loader Page - Haryana District Validation", () => {
  it("16. Validate Haryana District Names in English (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.english, 'english', 'Haryana', ExpectedHaryanaDistricts);
  });

  it("17. Validate Haryana District Names in Hindi (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.hindi, 'hindi', 'हरियाणा', ExpectedHaryanaDistricts);
  });

  it("18. Validate Haryana District Names in Marathi (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.marathi, 'marathi', 'हरियाणा', ExpectedHaryanaDistricts);
  });

  it("19. Validate Haryana District Names in Tamil (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.tamil, 'tamil', 'ஹரியானா', ExpectedHaryanaDistricts);
  });

  it("20. Validate Haryana District Names in Telugu (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.telugu, 'telugu', 'హర్యానా', ExpectedHaryanaDistricts);
  });
});

describe("JCB Backhoe Loader Page - Himachal Pradesh District Validation", () => {
  it("21. Validate Himachal Pradesh District Names in English (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.english, 'english', 'Himachal Pradesh', ExpectedHimachalPradeshDistricts);
  });

  it("22. Validate Himachal Pradesh District Names in Hindi (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.hindi, 'hindi', 'हिमाचल प्रदेश', ExpectedHimachalPradeshDistricts);
  });

  it("23. Validate Himachal Pradesh District Names in Marathi (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.marathi, 'marathi', 'हिमाचल प्रदेश', ExpectedHimachalPradeshDistricts);
  });

  it("24. Validate Himachal Pradesh District Names in Tamil (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.tamil, 'tamil', 'ஹிமாச்சல பிரதேசம்', ExpectedHimachalPradeshDistricts);
  });

  it("25. Validate Himachal Pradesh District Names in Telugu (JCB Backhoe Loader Page)", () => {
    validateDistrictsMainPage(JCBBackhoeLoaderUrls.telugu, 'telugu', 'హిమాచల్ ప్రదేశ్', ExpectedHimachalPradeshDistricts);
  });
});

});
