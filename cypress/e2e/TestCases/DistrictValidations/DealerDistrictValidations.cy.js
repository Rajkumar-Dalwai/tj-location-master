/// <reference types="cypress" />

import AndhraPradeshVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/AndhraPradeshVsDistrictsRepo.cy";
import GujaratVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/GujaratVsDistrictsRepo.cy";
import OdishaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/OdishaVsDistrictsRepo.cy";
import RajasthanVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/RajasthanVsDistrictsRepo.cy";
import WestBengalVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/WestBengalVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedAndhraPradeshDistricts = AndhraPradeshVsDistrictsRepo.getExpectedAndhraPradeshDistricts();
  const ExpectedGujaratDistricts = GujaratVsDistrictsRepo.getExpectedGujaratDistricts();
  const ExpectedOdishaDistricts = OdishaVsDistrictsRepo.getExpectedOdishaDistricts();
  const ExpectedRajasthanDistricts = RajasthanVsDistrictsRepo.getExpectedRajasthanDistricts();
  const ExpectedWestBengalDistricts = WestBengalVsDistrictsRepo.getExpectedWestBengalDistricts();

  const DealerPageUrls = {
    english: `${Cypress.env('url')}find-tractor-dealers/powertrac/`,
    hindi: `${Cypress.env('url')}hi/find-tractor-dealers/powertrac/`,
    marathi: `${Cypress.env('url')}mr/find-tractor-dealers/powertrac/`,
    tamil: `${Cypress.env('url')}ta/find-tractor-dealers/powertrac/`,
  };

  const DealerGridUrls = {
    english: `${Cypress.env('url')}massey-ferguson-tractor/7250-power-up/`,
    hindi: `${Cypress.env('url')}hi/massey-ferguson-tractor/7250-power-up/`,
    marathi: `${Cypress.env('url')}mr/massey-ferguson-tractor/7250-power-up/`,
    tamil: `${Cypress.env('url')}ta/massey-ferguson-tractor/7250-power-up/`,
    telugu: `${Cypress.env('url')}te/massey-ferguson-tractor/7250-power-up/`,
  };

  // Reusable function for Main Page
  const validateDistrictsMainPage = (pageUrl, languageKey, stateName, expectedDistricts) => {
    cy.visit(pageUrl);
    cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
    cy.get('#statesid2').should('be.visible').select(stateName);

    cy.intercept('GET', '/ajax/get-districts/*').as('loadDistricts');
    // cy.wait('@loadDistricts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

    cy.get('#tractor_submit_form2 > .row > :nth-child(4) > .custom-select option')
      .not(':first')
      .should('have.length', expectedDistricts.length);

    let mismatches = [];
    cy.get('#tractor_submit_form2 > .row > :nth-child(4) > .custom-select option')
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

 // Reusable function for Grid Page
 const validateDistrictsGridPage = (pageUrl, languageKey, stateName, expectedDistricts) => {
  cy.visit(pageUrl);
  cy.scrollTo('bottom', { duration: 5000 });
  cy.get('.cross', { timeout: 15000 }).should('be.visible').click();
  cy.wait(2000);
  cy.get(':nth-child(1) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
  cy.get('#statesid2').should('be.visible').select(stateName);

  cy.intercept('GET', '/ajax/get-districts/*').as('loadDistricts');
  // cy.wait('@loadDistricts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

  cy.get('#tractor_submit_form2 > .row > :nth-child(4) > .custom-select option')
    .not(':first')
    .should('have.length', expectedDistricts.length);

  let mismatches = [];
  cy.get('#tractor_submit_form2 > .row > :nth-child(4) > .custom-select option')
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
  describe("Dealer Pages - Andhra Pradesh District Validation", () => {
    it("1. Validate Andhra Pradesh District Names in English (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.english, 'english', 'Andhra Pradesh', ExpectedAndhraPradeshDistricts);
    });

   /* it("2. Validate Andhra Pradesh District Names in Hindi (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.hindi, 'hindi', 'महाराष्ट्र', ExpectedAndhraPradeshDistricts);
    });

    it("3. Validate Andhra Pradesh District Names in Marathi (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.marathi, 'marathi', 'महाराष्ट्र', ExpectedAndhraPradeshDistricts);
    });

    it("4. Validate Andhra Pradesh District Names in Tamil (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.tamil, 'tamil', 'மகாராஷ்டிரா', ExpectedAndhraPradeshDistricts);
    });

    it("5. Validate Andhra Pradesh District Names in Telugu (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.telugu, 'telugu', 'మహారాష్ట్ర', ExpectedAndhraPradeshDistricts);
    });*/
  });

 /* describe("Dealer Pages - Gujarat District Validation", () => {
    it("6. Validate Gujarat District Names in English (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.english, 'english', 'Gujarat', ExpectedGujaratDistricts);
    });

    it("7. Validate Gujarat District Names in Hindi (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.hindi, 'hindi', 'केरल', ExpectedGujaratDistricts);
    });

    it("8. Validate Gujarat District Names in Marathi (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.marathi, 'marathi', 'केरळा', ExpectedGujaratDistricts);
    });

    it("9. Validate Gujarat District Names in Tamil (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.tamil, 'tamil', 'கேரளா', ExpectedGujaratDistricts);
    });

    it("10. Validate Gujarat District Names in Telugu (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.telugu, 'telugu', 'కేరళ', ExpectedGujaratDistricts);
    });
  });

  describe("Dealer Pages - Odisha District Validation", () => {
    it("11. Validate Odisha District Names in English (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.english, 'english', 'Odisha', ExpectedOdishaDistricts);
    });

    it("12. Validate Odisha District Names in Hindi (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.hindi, 'hindi', 'कर्नाटक', ExpectedOdishaDistricts);
    });

    it("13. Validate Odisha District Names in Marathi (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.marathi, 'marathi', 'कर्नाटक', ExpectedOdishaDistricts);
    });

    it("14. Validate Odisha District Names in Tamil (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.tamil, 'tamil', 'கர்நாடகா', ExpectedOdishaDistricts);
    });

    it("15. Validate Odisha District Names in Telugu (Dealer Pages)", () => {
      validateDistrictsMainPage(DealerPageUrls.telugu, 'telugu', 'కర్ణాటక', ExpectedOdishaDistricts);
    });
});

describe("Dealer Pages - Rajasthan District Validation", () => {
  it("16. Validate Rajasthan District Names in English (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.english, 'english', 'Rajasthan', ExpectedRajasthanDistricts);
  });

  it("17. Validate Rajasthan District Names in Hindi (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.hindi, 'hindi', 'तेलंगाना', ExpectedRajasthanDistricts);
  });

  it("18. Validate Rajasthan District Names in Marathi (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.marathi, 'marathi', 'तेलंगणा', ExpectedRajasthanDistricts);
  });

  it("19. Validate Rajasthan District Names in Tamil (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.tamil, 'tamil', 'தெலுங்கானா', ExpectedRajasthanDistricts);
  });

  it("20. Validate Rajasthan District Names in Telugu (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.telugu, 'telugu', 'తెలంగాణ', ExpectedRajasthanDistricts);
  });
});

describe("Dealer Pages - West Bengal District Validation", () => {
  it("21. Validate West Bengal District Names in English (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.english, 'english', 'West Bengal', ExpectedWestBengalDistricts);
  });

  it("22. Validate West Bengal District Names in Hindi (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.hindi, 'hindi', 'उत्तर प्रदेश', ExpectedWestBengalDistricts);
  });

  it("23. Validate West Bengal District Names in Marathi (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.marathi, 'marathi', 'उत्तर प्रदेश', ExpectedWestBengalDistricts);
  });

  it("24. Validate West Bengal District Names in Tamil (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.tamil, 'tamil', 'உத்தரப்பிரதேசம்', ExpectedWestBengalDistricts);
  });

  it("25. Validate West Bengal District Names in Telugu (Dealer Pages)", () => {
    validateDistrictsMainPage(DealerPageUrls.telugu, 'telugu', 'ఉత్తర ప్రదేశ్', ExpectedWestBengalDistricts);
  });
});*/

 /*describe("Dealer Grid: PDP - Andhra Pradesh District Validation", () => {
    it("26. Validate Andhra Pradesh District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.english, 'english', 'Andhra Pradesh', ExpectedAndhraPradeshDistricts);
    });

    it("27. Validate Andhra Pradesh District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.hindi, 'hindi', 'महाराष्ट्र', ExpectedAndhraPradeshDistricts);
    });

    it("28. Validate Andhra Pradesh District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.marathi, 'marathi', 'महाराष्ट्र', ExpectedAndhraPradeshDistricts);
    });

    it("29. Validate Andhra Pradesh District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.tamil, 'tamil', 'மகாராஷ்டிரா', ExpectedAndhraPradeshDistricts);
    });

    it("30. Validate Andhra Pradesh District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.telugu, 'telugu', 'మహారాష్ట్ర', ExpectedAndhraPradeshDistricts);
    });
  });

  describe("Dealer Grid: PDP - Gujarat District Validation", () => {
    it("31. Validate Gujarat District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.english, 'english', 'Gujarat', ExpectedGujaratDistricts);
    });

    it("32. Validate Gujarat District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.hindi, 'hindi', 'केरल', ExpectedGujaratDistricts);
    });

    it("33. Validate Gujarat District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.marathi, 'marathi', 'केरळा', ExpectedGujaratDistricts);
    });

    it("34. Validate Gujarat District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.tamil, 'tamil', 'கேரளா', ExpectedGujaratDistricts);
    });

    it("35. Validate Gujarat District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.telugu, 'telugu', 'కేరళ', ExpectedGujaratDistricts);
    });
  });

describe("Dealer Grid: PDP - Odisha District Validation", () => {
    it("36. Validate Odisha District Names in English (Dealer Grid)", () => {
        validateDistrictsGridPage(DealerGridUrls.english, 'english', 'Odisha', ExpectedOdishaDistricts);
    });

    it("37. Validate Odisha District Names in Hindi (Dealer Grid)", () => {
        validateDistrictsGridPage(DealerGridUrls.hindi, 'hindi', 'कर्नाटक', ExpectedOdishaDistricts);
    });

    it("38. Validate Odisha District Names in Marathi (Dealer Grid)", () => {
        validateDistrictsGridPage(DealerGridUrls.kannada, 'marathi', 'कर्नाटक', ExpectedOdishaDistricts);
    });

    it("39. Validate Odisha District Names in Tamil (Dealer Grid)", () => {
        validateDistrictsGridPage(DealerGridUrls.tamil, 'tamil', 'கர்நாடகா', ExpectedOdishaDistricts);
    });

    it("40. Validate Odisha District Names in Telugu (Dealer Grid)", () => {
        validateDistrictsGridPage(DealerGridUrls.telugu, 'telugu', 'కర్ణాటక', ExpectedOdishaDistricts);
    });
});

describe("Dealer Grid: PDP - Rajasthan District Validation", () => {
  it("41. Validate Rajasthan District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.english, 'english', 'Rajasthan', ExpectedRajasthanDistricts);
  });

  it("42. Validate Rajasthan District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.hindi, 'hindi', 'तेलंगाना', ExpectedRajasthanDistricts);
  });

  it("43. Validate Rajasthan District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.marathi, 'marathi', 'तेलंगणा', ExpectedRajasthanDistricts);
  });

  it("44. Validate Rajasthan District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.tamil, 'tamil', 'தெலுங்கானா', ExpectedRajasthanDistricts);
  });

  it("45. Validate Rajasthan District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.telugu, 'telugu', 'తెలంగాణ', ExpectedRajasthanDistricts);
  });
});

describe("Dealer Grid: PDP - West Bengal District Validation", () => {
  it("46. Validate West Bengal District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.english, 'english', 'West Bengal', ExpectedWestBengalDistricts);
  });

  it("47. Validate West Bengal District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.hindi, 'hindi', 'उत्तर प्रदेश', ExpectedWestBengalDistricts);
  });

  it("48. Validate West Bengal District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.marathi, 'marathi', 'उत्तर प्रदेश', ExpectedWestBengalDistricts);
  });

  it("49. Validate West Bengal District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.tamil, 'tamil', 'உத்தரப்பிரதேசம்', ExpectedWestBengalDistricts);
  });

  it("50. Validate West Bengal District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPage(DealerGridUrls.telugu, 'telugu', 'ఉత్తర ప్రదేశ్', ExpectedWestBengalDistricts);
  });
});*/



});
