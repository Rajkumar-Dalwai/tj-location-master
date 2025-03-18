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
    english: `${Cypress.env('url')}find-tractor-dealers/mahindra/`,
    hindi: `${Cypress.env('url')}hi/find-tractor-dealers/mahindra/`,
    marathi: `${Cypress.env('url')}mr/find-tractor-dealers/mahindra/`,
    tamil: `${Cypress.env('url')}ta/find-tractor-dealers/mahindra/`,
    telugu: `${Cypress.env('url')}te/find-tractor-dealers/mahindra/`,
  };

  const DealerGridUrls = {
    english: `${Cypress.env('url')}massey-ferguson-tractor/7250-power-up/`,
    hindi: `${Cypress.env('url')}hi/massey-ferguson-tractor/7250-power-up/`,
    marathi: `${Cypress.env('url')}mr/massey-ferguson-tractor/7250-power-up/`,
    tamil: `${Cypress.env('url')}ta/massey-ferguson-tractor/7250-power-up/`,
    telugu: `${Cypress.env('url')}te/massey-ferguson-tractor/7250-power-up/`,
  };

  // Reusable function for Main Page
  const validateDistrictsMainPageForDealer = (pageUrl, languageKey, stateName, expectedDistrictsForDealer) => {
    cy.visit(pageUrl);
    cy.wait(2000);
    cy.get(':nth-child(7) > .bg-color-white > .new-equipment-anchor').first().click();
    cy.wait(2000);
    cy.get('#states').should('be.visible').select(stateName);
    cy.wait(2000);

    // cy.intercept('GET', '/ajax/get-districts/*').as('loadDistricts');
    // cy.wait('@loadDistricts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

    cy.get('#gorp_form_dist_id')
      .find('option')
      .not(':first')
      .should('have.length', expectedDistrictsForDealer.length);

    let mismatches = [];
    cy.get('#gorp_form_dist_id')
      .find('option')
      .not(':first')
      .each(($option, index) => {
        const actual = $option.text().trim();
        const expected = expectedDistrictsForDealer[index]?.[languageKey];
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
 const validateDistrictsGridPageForDealer = (pageUrl, languageKey, stateName, expectedDistrictsForDealer) => {
  cy.visit(pageUrl);
  cy.scrollTo('bottom', { duration: 5000 });
  cy.get('.cross', { timeout: 15000 }).should('be.visible').click();
  cy.wait(2000);
  cy.get(':nth-child(6) > .bg-color-white > .new-equipment-anchor').click();
  cy.get('#states').should('be.visible').select(stateName);

  // cy.intercept('GET', '/ajax/get-districts/*').as('loadDistricts');
  // cy.wait('@loadDistricts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

  cy.get('.modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(5) > #gorp_form_dist_id')
    .find('option')
    .not(':first')
    .should('have.length', expectedDistrictsForDealer.length);

  let mismatches = [];
  cy.get('.modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(5) > #gorp_form_dist_id')
    .find('option')
    .not(':first')
    .each(($option, index) => {
      const actual = $option.text().trim();
      const expected = expectedDistrictsForDealer[index]?.[languageKey];
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
  /*describe("Dealer Pages - Andhra Pradesh District Validation", () => {
    it("1. Validate Andhra Pradesh District Names in English (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.english, 'english', 'Andhra Pradesh', ExpectedAndhraPradeshDistricts);
    });

   it("2. Validate Andhra Pradesh District Names in Hindi (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.hindi, 'hindi', 'आंध्र प्रदेश', ExpectedAndhraPradeshDistricts);
    });

    it("3. Validate Andhra Pradesh District Names in Marathi (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.marathi, 'marathi', 'आंध्र प्रदेश', ExpectedAndhraPradeshDistricts);
    });

    it("4. Validate Andhra Pradesh District Names in Tamil (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.tamil, 'tamil', 'ஆந்திரப் பிரதேசம்', ExpectedAndhraPradeshDistricts);
    });

    it("5. Validate Andhra Pradesh District Names in Telugu (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.telugu, 'telugu', 'ఆంధ్రప్రదేశ్', ExpectedAndhraPradeshDistricts);
    });
  });

   describe("Dealer Pages - Gujarat District Validation", () => {
    it("6. Validate Gujarat District Names in English (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.english, 'english', 'Gujarat', ExpectedGujaratDistricts);
    });

    it("7. Validate Gujarat District Names in Hindi (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.hindi, 'hindi', 'गुजरात', ExpectedGujaratDistricts);
    });

    it("8. Validate Gujarat District Names in Marathi (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.marathi, 'marathi', 'गुजरात', ExpectedGujaratDistricts);
    });

    it("9. Validate Gujarat District Names in Tamil (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.tamil, 'tamil', 'குஜராத்', ExpectedGujaratDistricts);
    });

    it("10. Validate Gujarat District Names in Telugu (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.telugu, 'telugu', 'గుజరాత్', ExpectedGujaratDistricts);
    });
  });

  describe("Dealer Pages - Odisha District Validation", () => {
    it("11. Validate Odisha District Names in English (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.english, 'english', 'Odisha', ExpectedOdishaDistricts);
    });

    it("12. Validate Odisha District Names in Hindi (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.hindi, 'hindi', 'ओडिशा', ExpectedOdishaDistricts);
    });

    it("13. Validate Odisha District Names in Marathi (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.marathi, 'marathi', 'ओडिशा', ExpectedOdishaDistricts);
    });

    it("14. Validate Odisha District Names in Tamil (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.tamil, 'tamil', 'ஒடிசா', ExpectedOdishaDistricts);
    });

    it("15. Validate Odisha District Names in Telugu (Dealer Pages)", () => {
      validateDistrictsMainPageForDealer(DealerPageUrls.telugu, 'telugu', 'ఒడిశా', ExpectedOdishaDistricts);
    });
});

describe("Dealer Pages - Rajasthan District Validation", () => {
  it("16. Validate Rajasthan District Names in English (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.english, 'english', 'Rajasthan', ExpectedRajasthanDistricts);
  });

  it("17. Validate Rajasthan District Names in Hindi (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.hindi, 'hindi', 'राजस्थान', ExpectedRajasthanDistricts);
  });

  it("18. Validate Rajasthan District Names in Marathi (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.marathi, 'marathi', 'राजस्थान', ExpectedRajasthanDistricts);
  });

  it("19. Validate Rajasthan District Names in Tamil (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.tamil, 'tamil', 'ராஜஸ்தான்', ExpectedRajasthanDistricts);
  });

  it("20. Validate Rajasthan District Names in Telugu (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.telugu, 'telugu', 'రాజస్థాన్', ExpectedRajasthanDistricts);
  });
});

describe("Dealer Pages - West Bengal District Validation", () => {
  it("21. Validate West Bengal District Names in English (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.english, 'english', 'West Bengal', ExpectedWestBengalDistricts);
  });

  it("22. Validate West Bengal District Names in Hindi (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.hindi, 'hindi', 'पश्चिम बंगाल', ExpectedWestBengalDistricts);
  });

  it("23. Validate West Bengal District Names in Marathi (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.marathi, 'marathi', 'पश्चिम बंगाल', ExpectedWestBengalDistricts);
  });

  it("24. Validate West Bengal District Names in Tamil (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.tamil, 'tamil', 'மேற்கு வங்காளம்', ExpectedWestBengalDistricts);
  });

  it("25. Validate West Bengal District Names in Telugu (Dealer Pages)", () => {
    validateDistrictsMainPageForDealer(DealerPageUrls.telugu, 'telugu', 'పశ్చిమ బెంగాల్', ExpectedWestBengalDistricts);
  });
});*/

 describe("Dealer Grid: PDP - Andhra Pradesh District Validation", () => {
    it("26. Validate Andhra Pradesh District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.english, 'english', 'Andhra Pradesh', ExpectedAndhraPradeshDistricts);
    });

    it("27. Validate Andhra Pradesh District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'आंध्र प्रदेश', ExpectedAndhraPradeshDistricts);
    });

    it("28. Validate Andhra Pradesh District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'आंध्र प्रदेश', ExpectedAndhraPradeshDistricts);
    });

    it("29. Validate Andhra Pradesh District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'ஆந்திரப் பிரதேசம்', ExpectedAndhraPradeshDistricts);
    });

    it("30. Validate Andhra Pradesh District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'ఆంధ్రప్రదేశ్', ExpectedAndhraPradeshDistricts);
    });
  });

  describe("Dealer Grid: PDP - Gujarat District Validation", () => {
    it("31. Validate Gujarat District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.english, 'english', 'Gujarat', ExpectedGujaratDistricts);
    });

    it("32. Validate Gujarat District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'गुजरात', ExpectedGujaratDistricts);
    });

    it("33. Validate Gujarat District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'गुजरात', ExpectedGujaratDistricts);
    });

    it("34. Validate Gujarat District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'குஜராத்', ExpectedGujaratDistricts);
    });

    it("35. Validate Gujarat District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'గుజరాత్', ExpectedGujaratDistricts);
    });
  });

describe("Dealer Grid: PDP - Odisha District Validation", () => {
    it("36. Validate Odisha District Names in English (Dealer Grid)", () => {
        validateDistrictsGridPageForDealer(DealerGridUrls.english, 'english', 'Odisha', ExpectedOdishaDistricts);
    });

    it("37. Validate Odisha District Names in Hindi (Dealer Grid)", () => {
        validateDistrictsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'ओडिशा', ExpectedOdishaDistricts);
    });

    it("38. Validate Odisha District Names in Marathi (Dealer Grid)", () => {
        validateDistrictsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'ओडिशा', ExpectedOdishaDistricts);
    });

    it("39. Validate Odisha District Names in Tamil (Dealer Grid)", () => {
        validateDistrictsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'ஒடிசா', ExpectedOdishaDistricts);
    });

    it("40. Validate Odisha District Names in Telugu (Dealer Grid)", () => {
        validateDistrictsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'ఒడిశా', ExpectedOdishaDistricts);
    });
});

describe("Dealer Grid: PDP - Rajasthan District Validation", () => {
  it("41. Validate Rajasthan District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.english, 'english', 'Rajasthan', ExpectedRajasthanDistricts);
  });

  it("42. Validate Rajasthan District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'राजस्थान', ExpectedRajasthanDistricts);
  });

  it("43. Validate Rajasthan District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'राजस्थान', ExpectedRajasthanDistricts);
  });

  it("44. Validate Rajasthan District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'ராஜஸ்தான்', ExpectedRajasthanDistricts);
  });

  it("45. Validate Rajasthan District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'రాజస్థాన్', ExpectedRajasthanDistricts);
  });
});

describe("Dealer Grid: PDP - West Bengal District Validation", () => {
  it("46. Validate West Bengal District Names in English (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.english, 'english', 'West Bengal', ExpectedWestBengalDistricts);
  });

  it("47. Validate West Bengal District Names in Hindi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'पश्चिम बंगाल', ExpectedWestBengalDistricts);
  });

  it("48. Validate West Bengal District Names in Marathi (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'पश्चिम बंगाल', ExpectedWestBengalDistricts);
  });

  it("49. Validate West Bengal District Names in Tamil (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'மேற்கு வங்காளம்', ExpectedWestBengalDistricts);
  });

  it("50. Validate West Bengal District Names in Telugu (Dealer Grid)", () => {
      validateDistrictsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'పశ్చిమ బెంగాల్', ExpectedWestBengalDistricts);
  });
});



});
