/// <reference types="cypress" />

import AndamanAndNicobarIslandsVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/AndamanAndNicobarIslandsVsDistrictsRepo.cy";
import ArunachalPradeshVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/ArunachalPradeshVsDistrictsRepo.cy";
import AssamVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/AssamVsDistrictsRepo.cy";
import BiharVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/BiharVsDistrictsRepo.cy";
import ChandigarhVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/ChandigarhVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedAndamanAndNicobarIslandsDistricts = AndamanAndNicobarIslandsVsDistrictsRepo.getExpectedAndamanAndNicobarIslandsDistricts();
  const ExpectedArunachalPradeshDistricts = ArunachalPradeshVsDistrictsRepo.getExpectedArunachalPradeshDistricts();
  const ExpectedAssamDistricts = AssamVsDistrictsRepo.getExpectedAssamDistricts();
  const ExpectedBiharDistricts = BiharVsDistrictsRepo.getExpectedBiharDistricts();
  const ExpectedChandigarhDistricts = ChandigarhVsDistrictsRepo.getExpectedChandigarhDistricts();


  const ServiceCentrePageUrls = {
    english: `${Cypress.env('url')}tractor-service-centers/satara/`,
    hindi: `${Cypress.env('url')}hi/tractor-service-centers/satara/`,
    marathi: `${Cypress.env('url')}mr/tractor-service-centers/satara/`,
    tamil: `${Cypress.env('url')}ta/tractor-service-centers/satara/`,
    telugu: `${Cypress.env('url')}te/tractor-service-centers/satara/`,
  };

  const ServiceCentreGridUrls = {
    english: `${Cypress.env('url')}massey-ferguson-tractor/`,
    hindi: `${Cypress.env('url')}hi/massey-ferguson-tractor/`,
    marathi: `${Cypress.env('url')}mr/massey-ferguson-tractor/`,
    tamil: `${Cypress.env('url')}ta/massey-ferguson-tractor/`,
    telugu: `${Cypress.env('url')}te/massey-ferguson-tractor/`,
  };

  // Reusable function for Main Page
  const validateDistrictsMainPage = (pageUrl, languageKey, stateName, expectedDistrictsForDealer) => {
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
 const validateDistrictsGridPage = (pageUrl, languageKey, stateName, expectedDistrictsForDealer) => {
  cy.visit(pageUrl);
  cy.scrollTo('bottom', { duration: 5000 });
  cy.get('.filter-img1', { timeout: 15000 }).should('be.visible').click();
  cy.wait(2000);
  cy.get('#service-tab').click();
  cy.wait(2000);
  cy.get('#service > .tractor-new-reviews > :nth-child(1) > .bg-color-white > .new-equipment-anchor').click();
  cy.wait(2000);
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
  describe("Service Centre Pages - Andaman And Nicobar Islands District Validation", () => {
    it("1. Validate Andaman And Nicobar Islands District Names in English (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.english, 'english', 'Andaman And Nicobar Islands', ExpectedAndamanAndNicobarIslandsDistricts);
    });

   it("2. Validate Andaman And Nicobar Islands District Names in Hindi (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.hindi, 'hindi', 'अंडमान व नोकोबार द्वीप समूह', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("3. Validate Andaman And Nicobar Islands District Names in Marathi (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.marathi, 'marathi', 'अंदमान आणि निकोबार बेटे', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("4. Validate Andaman And Nicobar Islands District Names in Tamil (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.tamil, 'tamil', 'அந்தமான் நிக்கோபார் தீவுகள்', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("5. Validate Andaman And Nicobar Islands District Names in Telugu (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.telugu, 'telugu', 'అండమాన్ మరియు నికోబార్ దీవులు', ExpectedAndamanAndNicobarIslandsDistricts);
    });
  });

   describe("Service Centre Pages - Arunachal Pradesh District Validation", () => {
    it("6. Validate Arunachal Pradesh District Names in English (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.english, 'english', 'Arunachal Pradesh', ExpectedArunachalPradeshDistricts);
    });

    it("7. Validate Arunachal Pradesh District Names in Hindi (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.hindi, 'hindi', 'अरुणाचल प्रदेश', ExpectedArunachalPradeshDistricts);
    });

    it("8. Validate Arunachal Pradesh District Names in Marathi (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.marathi, 'marathi', 'अरुणाचल प्रदेश', ExpectedArunachalPradeshDistricts);
    });

    it("9. Validate Arunachal Pradesh District Names in Tamil (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.tamil, 'tamil', 'அருணாச்சல பிரதேசம்', ExpectedArunachalPradeshDistricts);
    });

    it("10. Validate Arunachal Pradesh District Names in Telugu (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.telugu, 'telugu', 'అరుణాచల్ ప్రదేశ్', ExpectedArunachalPradeshDistricts);
    });
  });

  describe("Service Centre Pages - Assam District Validation", () => {
    it("11. Validate Assam District Names in English (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.english, 'english', 'Assam', ExpectedAssamDistricts);
    });

    it("12. Validate Assam District Names in Hindi (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.hindi, 'hindi', 'असम', ExpectedAssamDistricts);
    });

    it("13. Validate Assam District Names in Marathi (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.marathi, 'marathi', 'आसाम', ExpectedAssamDistricts);
    });

    it("14. Validate Assam District Names in Tamil (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.tamil, 'tamil', 'அசாம்', ExpectedAssamDistricts);
    });

    it("15. Validate Assam District Names in Telugu (Service Centre Pages)", () => {
      validateDistrictsMainPage(ServiceCentrePageUrls.telugu, 'telugu', 'అస్సాం', ExpectedAssamDistricts);
    });
});

describe("Service Centre Pages - Bihar District Validation", () => {
  it("16. Validate Bihar District Names in English (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.english, 'english', 'Bihar', ExpectedBiharDistricts);
  });

  it("17. Validate Bihar District Names in Hindi (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.hindi, 'hindi', 'बिहार', ExpectedBiharDistricts);
  });

  it("18. Validate Bihar District Names in Marathi (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.marathi, 'marathi', 'बिहार', ExpectedBiharDistricts);
  });

  it("19. Validate Bihar District Names in Tamil (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.tamil, 'tamil', 'பீகார்', ExpectedBiharDistricts);
  });

  it("20. Validate Bihar District Names in Telugu (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.telugu, 'telugu', 'బీహార్', ExpectedBiharDistricts);
  });
});

describe("Service Centre Pages - Chandigarh District Validation", () => {
  it("21. Validate Chandigarh District Names in English (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.english, 'english', 'Chandigarh', ExpectedChandigarhDistricts);
  });

  it("22. Validate Chandigarh District Names in Hindi (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.hindi, 'hindi', 'चंडीगढ़', ExpectedChandigarhDistricts);
  });

  it("23. Validate Chandigarh District Names in Marathi (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.marathi, 'marathi', 'चंदीगड', ExpectedChandigarhDistricts);
  });

  it("24. Validate Chandigarh District Names in Tamil (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.tamil, 'tamil', 'சண்டிகர்', ExpectedChandigarhDistricts);
  });

  it("25. Validate Chandigarh District Names in Telugu (Service Centre Pages)", () => {
    validateDistrictsMainPage(ServiceCentrePageUrls.telugu, 'telugu', 'చండీగఢ్', ExpectedChandigarhDistricts);
  });
});

 /*describe("Service Centre Grid: BLP - Andaman And Nicobar Islands District Validation", () => {
    it("26. Validate Andaman And Nicobar Islands District Names in English (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.english, 'english', 'Andaman And Nicobar Islands', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("27. Validate Andaman And Nicobar Islands District Names in Hindi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.hindi, 'hindi', 'अंडमान व नोकोबार द्वीप समूह', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("28. Validate Andaman And Nicobar Islands District Names in Marathi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.marathi, 'marathi', 'अंदमान आणि निकोबार बेटे', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("29. Validate Andaman And Nicobar Islands District Names in Tamil (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.tamil, 'tamil', 'அந்தமான் நிக்கோபார் தீவுகள்', ExpectedAndamanAndNicobarIslandsDistricts);
    });

    it("30. Validate Andaman And Nicobar Islands District Names in Telugu (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.telugu, 'telugu', 'అండమాన్ మరియు నికోబార్ దీవులు', ExpectedAndamanAndNicobarIslandsDistricts);
    });
  });

  describe("Service Centre Grid: BLP - Arunachal Pradesh District Validation", () => {
    it("31. Validate Arunachal Pradesh District Names in English (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.english, 'english', 'Arunachal Pradesh', ExpectedArunachalPradeshDistricts);
    });

    it("32. Validate Arunachal Pradesh District Names in Hindi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.hindi, 'hindi', 'अरुणाचल प्रदेश', ExpectedArunachalPradeshDistricts);
    });

    it("33. Validate Arunachal Pradesh District Names in Marathi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.marathi, 'marathi', 'अरुणाचल प्रदेश', ExpectedArunachalPradeshDistricts);
    });

    it("34. Validate Arunachal Pradesh District Names in Tamil (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.tamil, 'tamil', 'அருணாச்சல பிரதேசம்', ExpectedArunachalPradeshDistricts);
    });

    it("35. Validate Arunachal Pradesh District Names in Telugu (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.telugu, 'telugu', 'అరుణాచల్ ప్రదేశ్', ExpectedArunachalPradeshDistricts);
    });
  });

describe("Service Centre Grid: BLP - Assam District Validation", () => {
    it("36. Validate Assam District Names in English (Service Centre Grid)", () => {
        validateDistrictsGridPage(ServiceCentreGridUrls.english, 'english', 'Assam', ExpectedAssamDistricts);
    });

    it("37. Validate Assam District Names in Hindi (Service Centre Grid)", () => {
        validateDistrictsGridPage(ServiceCentreGridUrls.hindi, 'hindi', 'असम', ExpectedAssamDistricts);
    });

    it("38. Validate Assam District Names in Marathi (Service Centre Grid)", () => {
        validateDistrictsGridPage(ServiceCentreGridUrls.marathi, 'marathi', 'आसाम', ExpectedAssamDistricts);
    });

    it("39. Validate Assam District Names in Tamil (Service Centre Grid)", () => {
        validateDistrictsGridPage(ServiceCentreGridUrls.tamil, 'tamil', 'அசாம்', ExpectedAssamDistricts);
    });

    it("40. Validate Assam District Names in Telugu (Service Centre Grid)", () => {
        validateDistrictsGridPage(ServiceCentreGridUrls.telugu, 'telugu', 'అస్సాం', ExpectedAssamDistricts);
    });
});

describe("Service Centre Grid: BLP - Bihar District Validation", () => {
  it("41. Validate Bihar District Names in English (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.english, 'english', 'Bihar', ExpectedBiharDistricts);
  });

  it("42. Validate Bihar District Names in Hindi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.hindi, 'hindi', 'बिहार', ExpectedBiharDistricts);
  });

  it("43. Validate Bihar District Names in Marathi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.marathi, 'marathi', 'बिहार', ExpectedBiharDistricts);
  });

  it("44. Validate Bihar District Names in Tamil (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.tamil, 'tamil', 'பீகார்', ExpectedBiharDistricts);
  });

  it("45. Validate Bihar District Names in Telugu (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.telugu, 'telugu', 'బీహార్', ExpectedBiharDistricts);
  });
});

describe("Service Centre Grid: BLP - Chandigarh District Validation", () => {
  it("46. Validate Chandigarh District Names in English (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.english, 'english', 'Chandigarh', ExpectedChandigarhDistricts);
  });

  it("47. Validate Chandigarh District Names in Hindi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.hindi, 'hindi', 'चंडीगढ़', ExpectedChandigarhDistricts);
  });

  it("48. Validate Chandigarh District Names in Marathi (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.marathi, 'marathi', 'चंदीगड', ExpectedChandigarhDistricts);
  });

  it("49. Validate Chandigarh District Names in Tamil (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.tamil, 'tamil', 'சண்டிகர்', ExpectedChandigarhDistricts);
  });

  it("50. Validate Chandigarh District Names in Telugu (Service Centre Grid)", () => {
      validateDistrictsGridPage(ServiceCentreGridUrls.telugu, 'telugu', 'చండీగఢ్', ExpectedChandigarhDistricts);
  });
});*/

});
