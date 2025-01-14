/// <reference types="cypress" />

import MaharashtraVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/MaharashtraVsDistrictsRepo.cy";
import KeralaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/KeralaVsDistrictsRepo.cy";
import KarnatakaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/KarnatakaVsDistrictsRepo.cy";
import TelanganaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/TelanganaVsDistrictsRepo.cy";
import UttarPradeshVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/UttarPradeshVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedMaharashtraDistricts = MaharashtraVsDistrictsRepo.getExpectedMaharashtraDistricts();
  const ExpectedKeralaDistricts = KeralaVsDistrictsRepo.getExpectedKeralaDistricts();
  const ExpectedKarnatakaDistricts = KarnatakaVsDistrictsRepo.getExpectedKarnatakaDistricts();
  const ExpectedTelanganaDistricts = TelanganaVsDistrictsRepo.getExpectedTelanganaDistricts();
  const ExpectedUttarPradeshDistricts = UttarPradeshVsDistrictsRepo.getExpectedUttarPradeshDistricts();

  const TyrePageUrls = {
    english: `${Cypress.env('url')}tyres/`,
    hindi: `${Cypress.env('url')}hi/tyres/`,
    marathi: `${Cypress.env('url')}mr/tyres/`,
    tamil: `${Cypress.env('url')}ta/tyres/`,
    telugu: `${Cypress.env('url')}te/tyres/`,
  };

  const TyreGridUrls = {
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
    cy.get('#statesid2').should('be.visible').select(stateName,{ force: true });

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
  cy.get('#statesid2').should('be.visible').select(stateName,{ force: true });

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
  describe("Tyre Pages - Maharashtra District Validation", () => {
    it("1. Validate Maharashtra District Names in English (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.english, 'english', 'Maharashtra', ExpectedMaharashtraDistricts);
    });

    it("2. Validate Maharashtra District Names in Hindi (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.hindi, 'hindi', 'महाराष्ट्र', ExpectedMaharashtraDistricts);
    });

    it("3. Validate Maharashtra District Names in Marathi (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.marathi, 'marathi', 'महाराष्ट्र', ExpectedMaharashtraDistricts);
    });

    it("4. Validate Maharashtra District Names in Tamil (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.tamil, 'tamil', 'மகாராஷ்டிரா', ExpectedMaharashtraDistricts);
    });

    it("5. Validate Maharashtra District Names in Telugu (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.telugu, 'telugu', 'మహారాష్ట్ర', ExpectedMaharashtraDistricts);
    });
  });

  describe("Tyre Pages - Kerala District Validation", () => {
    it("6. Validate Kerala District Names in English (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.english, 'english', 'Kerala', ExpectedKeralaDistricts);
    });

    it("7. Validate Kerala District Names in Hindi (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.hindi, 'hindi', 'केरल', ExpectedKeralaDistricts);
    });

    it("8. Validate Kerala District Names in Marathi (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.marathi, 'marathi', 'केरळा', ExpectedKeralaDistricts);
    });

    it("9. Validate Kerala District Names in Tamil (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.tamil, 'tamil', 'கேரளா', ExpectedKeralaDistricts);
    });

    it("10. Validate Kerala District Names in Telugu (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.telugu, 'telugu', 'కేరళ', ExpectedKeralaDistricts);
    });
  });

  describe("Tyre Pages - Karnataka District Validation", () => {
    it("11. Validate Karnataka District Names in English (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.english, 'english', 'Karnataka', ExpectedKarnatakaDistricts);
    });

    it("12. Validate Karnataka District Names in Hindi (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.hindi, 'hindi', 'कर्नाटक', ExpectedKarnatakaDistricts);
    });

    it("13. Validate Karnataka District Names in Marathi (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.marathi, 'marathi', 'कर्नाटक', ExpectedKarnatakaDistricts);
    });

    it("14. Validate Karnataka District Names in Tamil (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.tamil, 'tamil', 'கர்நாடகா', ExpectedKarnatakaDistricts);
    });

    it("15. Validate Karnataka District Names in Telugu (Tyre Pages)", () => {
      validateDistrictsMainPage(TyrePageUrls.telugu, 'telugu', 'కర్ణాటక', ExpectedKarnatakaDistricts);
    });
});

describe("Tyre Pages - Telangana District Validation", () => {
  it("16. Validate Telangana District Names in English (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.english, 'english', 'Telangana', ExpectedTelanganaDistricts);
  });

  it("17. Validate Telangana District Names in Hindi (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.hindi, 'hindi', 'तेलंगाना', ExpectedTelanganaDistricts);
  });

  it("18. Validate Telangana District Names in Marathi (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.marathi, 'marathi', 'तेलंगणा', ExpectedTelanganaDistricts);
  });

  it("19. Validate Telangana District Names in Tamil (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.tamil, 'tamil', 'தெலுங்கானா', ExpectedTelanganaDistricts);
  });

  it("20. Validate Telangana District Names in Telugu (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.telugu, 'telugu', 'తెలంగాణ', ExpectedTelanganaDistricts);
  });
});

describe("Tyre Pages - Uttar Pradesh District Validation", () => {
  it("21. Validate Uttar Pradesh District Names in English (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.english, 'english', 'Uttar Pradesh', ExpectedUttarPradeshDistricts);
  });

  it("22. Validate Uttar Pradesh District Names in Hindi (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.hindi, 'hindi', 'उत्तर प्रदेश', ExpectedUttarPradeshDistricts);
  });

  it("23. Validate Uttar Pradesh District Names in Marathi (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.marathi, 'marathi', 'उत्तर प्रदेश', ExpectedUttarPradeshDistricts);
  });

  it("24. Validate Uttar Pradesh District Names in Tamil (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.tamil, 'tamil', 'உத்தரப்பிரதேசம்', ExpectedUttarPradeshDistricts);
  });

  it("25. Validate Uttar Pradesh District Names in Telugu (Tyre Pages)", () => {
    validateDistrictsMainPage(TyrePageUrls.telugu, 'telugu', 'ఉత్తర ప్రదేశ్', ExpectedUttarPradeshDistricts);
  });
});

 describe("Tyre Grid: PDP - Maharashtra District Validation", () => {
    it("26. Validate Maharashtra District Names in English (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.english, 'english', 'Maharashtra', ExpectedMaharashtraDistricts);
    });

    it("27. Validate Maharashtra District Names in Hindi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.hindi, 'hindi', 'महाराष्ट्र', ExpectedMaharashtraDistricts);
    });

    it("28. Validate Maharashtra District Names in Marathi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.marathi, 'marathi', 'महाराष्ट्र', ExpectedMaharashtraDistricts);
    });

    it("29. Validate Maharashtra District Names in Tamil (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.tamil, 'tamil', 'மகாராஷ்டிரா', ExpectedMaharashtraDistricts);
    });

    it("30. Validate Maharashtra District Names in Telugu (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.telugu, 'telugu', 'మహారాష్ట్ర', ExpectedMaharashtraDistricts);
    });
  });

  describe("Tyre Grid: PDP - Kerala District Validation", () => {
    it("31. Validate Kerala District Names in English (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.english, 'english', 'Kerala', ExpectedKeralaDistricts);
    });

    it("32. Validate Kerala District Names in Hindi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.hindi, 'hindi', 'केरल', ExpectedKeralaDistricts);
    });

    it("33. Validate Kerala District Names in Marathi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.marathi, 'marathi', 'केरळा', ExpectedKeralaDistricts);
    });

    it("34. Validate Kerala District Names in Tamil (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.tamil, 'tamil', 'கேரளா', ExpectedKeralaDistricts);
    });

    it("35. Validate Kerala District Names in Telugu (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.telugu, 'telugu', 'కేరళ', ExpectedKeralaDistricts);
    });
  });

describe("Tyre Grid: PDP - Karnataka District Validation", () => {
    it("36. Validate Karnataka District Names in English (Tyre Grid)", () => {
        validateDistrictsGridPage(TyreGridUrls.english, 'english', 'Karnataka', ExpectedKarnatakaDistricts);
    });

    it("37. Validate Karnataka District Names in Hindi (Tyre Grid)", () => {
        validateDistrictsGridPage(TyreGridUrls.hindi, 'hindi', 'कर्नाटक', ExpectedKarnatakaDistricts);
    });

    it("38. Validate Karnataka District Names in Marathi (Tyre Grid)", () => {
        validateDistrictsGridPage(TyreGridUrls.kannada, 'marathi', 'कर्नाटक', ExpectedKarnatakaDistricts);
    });

    it("39. Validate Karnataka District Names in Tamil (Tyre Grid)", () => {
        validateDistrictsGridPage(TyreGridUrls.tamil, 'tamil', 'கர்நாடகா', ExpectedKarnatakaDistricts);
    });

    it("40. Validate Karnataka District Names in Telugu (Tyre Grid)", () => {
        validateDistrictsGridPage(TyreGridUrls.telugu, 'telugu', 'కర్ణాటక', ExpectedKarnatakaDistricts);
    });
});

describe("Tyre Grid: PDP - Telangana District Validation", () => {
  it("41. Validate Telangana District Names in English (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.english, 'english', 'Telangana', ExpectedTelanganaDistricts);
  });

  it("42. Validate Telangana District Names in Hindi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.hindi, 'hindi', 'तेलंगाना', ExpectedTelanganaDistricts);
  });

  it("43. Validate Telangana District Names in Marathi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.marathi, 'marathi', 'तेलंगणा', ExpectedTelanganaDistricts);
  });

  it("44. Validate Telangana District Names in Tamil (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.tamil, 'tamil', 'தெலுங்கானா', ExpectedTelanganaDistricts);
  });

  it("45. Validate Telangana District Names in Telugu (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.telugu, 'telugu', 'తెలంగాణ', ExpectedTelanganaDistricts);
  });
});

describe("Tyre Grid: PDP - Uttar Pradesh District Validation", () => {
  it("46. Validate Uttar Pradesh District Names in English (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.english, 'english', 'Uttar Pradesh', ExpectedUttarPradeshDistricts);
  });

  it("47. Validate Uttar Pradesh District Names in Hindi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.hindi, 'hindi', 'उत्तर प्रदेश', ExpectedUttarPradeshDistricts);
  });

  it("48. Validate Uttar Pradesh District Names in Marathi (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.marathi, 'marathi', 'उत्तर प्रदेश', ExpectedUttarPradeshDistricts);
  });

  it("49. Validate Uttar Pradesh District Names in Tamil (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.tamil, 'tamil', 'உத்தரப்பிரதேசம்', ExpectedUttarPradeshDistricts);
  });

  it("50. Validate Uttar Pradesh District Names in Telugu (Tyre Grid)", () => {
      validateDistrictsGridPage(TyreGridUrls.telugu, 'telugu', 'ఉత్తర ప్రదేశ్', ExpectedUttarPradeshDistricts);
  });
});


});
