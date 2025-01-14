/// <reference types="cypress" />

import DibangValleyVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/DibangValleyVsTehsilsRepo.cy";
import GunturVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/GunturVsTehsilsRepo.cy";
import PatnaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/PatnaVsTehsilsRepo.cy";
import RajkotVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/RajkotVsTehsilsRepo.cy";
import SouthGoaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/SouthGoaVsTehsilsRepo.cy";

describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedDibangValleyTehsils = DibangValleyVsTehsilsRepo.getExpectedDibangValleyTehsils();
  const ExpectedGunturTehsils = GunturVsTehsilsRepo.getExpectedGunturTehsils();
  const ExpectedPatnaTehsils = PatnaVsTehsilsRepo.getExpectedPatnaTehsils();
  const ExpectedRajkotTehsils = RajkotVsTehsilsRepo.getExpectedRajkotTehsils();
  const ExpectedSouthGoaTehsils = SouthGoaVsTehsilsRepo.getExpectedSouthGoaTehsils();

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

  const validateTehsilsMainPage = (pageUrl, languageKey, stateName, districtName, expectedTehsils) => {
    cy.visit(pageUrl);
    cy.wait(2000);
    cy.get('.new-equipment-card-anchor > .new-equipment-anchor').first().click();
    cy.wait(2000);
    cy.get('#statesid2').select(stateName,{ force: true });
    cy.wait(2000);
    cy.get('#tractor_submit_form2 > .row > :nth-child(4) > .custom-select').select(districtName,{ force: true });
  
    cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');
  //cy.wait('@loadTehsils', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
  
    // Validate the length of dropdown options excluding the first option
    cy.get('#tractor_submit_form2 > .row > :nth-child(5) > .custom-select > option')
      .then(($options) => {
        const visibleOptions = $options.slice(1); // Exclude the first option
        expect(visibleOptions.length).to.eq(expectedTehsils.length);
  
        // Validate the text of each tehsil
        const mismatches = [];
        visibleOptions.each((index, option) => {
          const actual = Cypress.$(option).text().trim();
          const expected = expectedTehsils[index]?.[languageKey];
          if (actual !== expected) mismatches.push({ index, actual, expected });
        });
  
        if (mismatches.length) {
          cy.log('Mismatched Tehsils:', mismatches);
          throw new Error(`Tehsil validation failed. Mismatched Tehsils: ${JSON.stringify(mismatches)}`);
        } else {
          cy.log(`All Tehsils are matched accurately in ${languageKey}!`);
        }
      });
  };

 // Reusable function for Grid Page
    const validateTehsilsGridPage = (pageUrl, languageKey, stateName,districtName, expectedTehsils) => {
     cy.visit(pageUrl);
     cy.scrollTo('bottom', { duration: 5000 });
     cy.get('.cross', { timeout: 15000 }).click({force: true});
     cy.wait(2000);
     cy.get(':nth-child(1) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click({force: true});
     cy.wait(2000);
     cy.get('#statesid2').select(stateName, { force: true });
     cy.wait(2000);
     cy.get('#tractor_submit_form2 > .row > :nth-child(4) > .custom-select').select(districtName, { force: true });

    cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');
  //cy.wait('@loadTehsils', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
  
    // Validate the length of dropdown options excluding the first option
    cy.get('#tractor_submit_form2 > .row > :nth-child(5) > .custom-select > option')
    .then(($options) => {
      const visibleOptions = $options.slice(1); // Exclude the first option
      expect(visibleOptions.length).to.eq(expectedTehsils.length);

      // Validate the text of each tehsil
      const mismatches = [];
      visibleOptions.each((index, option) => {
        const actual = Cypress.$(option).text().trim();
        const expected = expectedTehsils[index]?.[languageKey];
        if (actual !== expected) mismatches.push({ index, actual, expected });
      });

      if (mismatches.length) {
        cy.log('Mismatched Tehsils:', mismatches);
        throw new Error(`Tehsil validation failed. Mismatched Tehsils: ${JSON.stringify(mismatches)}`);
      } else {
        cy.log(`All Tehsils are matched accurately in ${languageKey}!`);
      }
    });
};

  // Test cases

  describe("Tyre Pages - Dibang Valley Tehsil Validation", () => {
    it("1. Validate Dibang Valley Tehsil Names in English (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.english, 'english','Arunachal Pradesh', 'Dibang Valley', ExpectedDibangValleyTehsils);
    });

    it("2. Validate Dibang Valley Tehsil Names in Hindi (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.hindi, 'hindi', 'अरुणाचल प्रदेश','दिबांग घाटी', ExpectedDibangValleyTehsils);
    });

    it("3. Validate Dibang Valley Tehsil Names in Marathi (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.marathi, 'marathi', 'अरुणाचल प्रदेश','दिबांग व्हॅली', ExpectedDibangValleyTehsils);
    });

    it("4. Validate Dibang Valley Tehsil Names in Tamil (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.tamil, 'tamil', 'அருணாச்சல பிரதேசம்', 'திபாங் பள்ளத்தாக்கு', ExpectedDibangValleyTehsils);
    });

    it("5. Validate Dibang Valley Tehsil Names in Telugu (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.telugu, 'telugu', 'అరుణాచల్ ప్రదేశ్', 'దిబాంగ్ లోయ', ExpectedDibangValleyTehsils);
    }); 
  });

 describe("Tyre Pages - Guntur Tehsil Validation", () => {
    it("6. Validate Guntur Tehsil Names in English (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.english, 'english','Andhra Pradesh', 'Guntur', ExpectedGunturTehsils);
    });

    it("7. Validate Guntur Tehsil Names in Hindi (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.hindi, 'hindi','आंध्र प्रदेश', 'गुंटूर', ExpectedGunturTehsils);
    });

    it("8. Validate Guntur Tehsil Names in Marathi (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.marathi, 'marathi','आंध्र प्रदेश', 'गुंटूर', ExpectedGunturTehsils);
    });

    it("9. Validate Guntur Tehsil Names in Tamil (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.tamil, 'tamil','ஆந்திரப் பிரதேசம்','குண்டூர்', ExpectedGunturTehsils);
    });

    it("10. Validate Guntur Tehsil Names in Telugu (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.telugu, 'telugu','ఆంధ్రప్రదేశ్', 'గుంటూరు', ExpectedGunturTehsils);
    });
  });

  describe("Tyre Pages - Patna Tehsil Validation", () => {
    it("11. Validate Patna Tehsil Names in English (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.english, 'english','Bihar', 'Patna', ExpectedPatnaTehsils);
    });

    it("12. Validate Patna Tehsil Names in Hindi (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.hindi, 'hindi','बिहार', 'पटना', ExpectedPatnaTehsils);
    });

    it("13. Validate Patna Tehsil Names in Marathi (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.marathi, 'marathi','बिहार', 'पाटणा', ExpectedPatnaTehsils);
    });

    it("14. Validate Patna Tehsil Names in Tamil (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.tamil, 'tamil','பீகார்', 'பாட்னா', ExpectedPatnaTehsils);
    });

    it("15. Validate Patna Tehsil Names in Telugu (Tyre Pages)", () => {
      validateTehsilsMainPage(TyrePageUrls.telugu, 'telugu','బీహార్', 'పాట్నా', ExpectedPatnaTehsils);
    });
});

describe("Tyre Pages - Rajkot Tehsil Validation", () => {
  it("16. Validate Rajkot Tehsil Names in English (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.english, 'english','Gujarat', 'Rajkot', ExpectedRajkotTehsils);
  });

  it("17. Validate Rajkot Tehsil Names in Hindi (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.hindi, 'hindi','गुजरात', 'राजकोट', ExpectedRajkotTehsils);
  });

  it("18. Validate Rajkot Tehsil Names in Marathi (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.marathi, 'marathi','गुजरात', 'राजकोट', ExpectedRajkotTehsils);
  });

  it("19. Validate Rajkot Tehsil Names in Tamil (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.tamil, 'tamil','குஜராத்', 'ராஜ்கோட்', ExpectedRajkotTehsils);
  });

  it("20. Validate Rajkot Tehsil Names in Telugu (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.telugu, 'telugu','గుజరాత్', 'రాజ్‌కోట్', ExpectedRajkotTehsils);
  });
});

describe("Tyre Pages - South Goa Tehsil Validation", () => {
  it("21. Validate South Goa Tehsil Names in English (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.english, 'english','Goa', 'South Goa', ExpectedSouthGoaTehsils);
  });

  it("22. Validate South Goa Tehsil Names in Hindi (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.hindi, 'hindi','गोवा', 'साउथ गोवा', ExpectedSouthGoaTehsils);
  });

  it("23. Validate South Goa Tehsil Names in Marathi (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.marathi, 'marathi','गोवा', 'दक्षिण गोवा', ExpectedSouthGoaTehsils);
  });

  it("24. Validate South Goa Tehsil Names in Tamil (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.tamil, 'tamil','கோவா', 'தெற்கு கோவா', ExpectedSouthGoaTehsils);
  });

  it("25. Validate South Goa Tehsil Names in Telugu (Tyre Pages)", () => {
    validateTehsilsMainPage(TyrePageUrls.telugu, 'telugu','గోవా', 'దక్షిణ గోవా', ExpectedSouthGoaTehsils);
  });
});

  describe("Tyre Grid: PDP - Dibang Valley Tehsil Validation", () => {
    it("26. Validate Dibang Valley Tehsil Names in English (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.english, 'english','Arunachal Pradesh', 'Dibang Valley', ExpectedDibangValleyTehsils);
    });

    it("27. Validate Dibang Valley Tehsil Names in Hindi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.hindi, 'hindi', 'अरुणाचल प्रदेश','दिबांग घाटी', ExpectedDibangValleyTehsils);
    });

    it("28. Validate Dibang Valley Tehsil Names in Marathi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.marathi, 'marathi', 'अरुणाचल प्रदेश','दिबांग व्हॅली', ExpectedDibangValleyTehsils);
    });

    it("29. Validate Dibang Valley Tehsil Names in Tamil (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.tamil, 'tamil', 'அருணாச்சல பிரதேசம்','திபாங் பள்ளத்தாக்கு', ExpectedDibangValleyTehsils);
    });

    it("30. Validate Dibang Valley Tehsil Names in Telugu (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.telugu, 'telugu', 'అరుణాచల్ ప్రదేశ్','దిబాంగ్ లోయ', ExpectedDibangValleyTehsils);
    });
  });

  describe("Tyre Grid: PDP - Guntur Tehsil Validation", () => {
    it("31. Validate Guntur Tehsil Names in English (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.english, 'english','Andhra Pradesh', 'Guntur', ExpectedGunturTehsils);
    });

    it("32. Validate Guntur Tehsil Names in Hindi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.hindi, 'hindi','आंध्र प्रदेश', 'गुंटूर', ExpectedGunturTehsils);
    });

    it("33. Validate Guntur Tehsil Names in Marathi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.marathi, 'marathi', 'आंध्र प्रदेश', 'गुंटूर', ExpectedGunturTehsils);
    });

    it("34. Validate Guntur Tehsil Names in Tamil (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.tamil, 'tamil', 'ஆந்திரப் பிரதேசம்','குண்டூர்', ExpectedGunturTehsils);
    });

    it("35. Validate Guntur Tehsil Names in Telugu (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.telugu, 'telugu', 'ఆంధ్రప్రదేశ్', 'గుంటూరు', ExpectedGunturTehsils);
    });
  });

describe("Tyre Grid: PDP - Patna Tehsil Validation", () => {
    it("36. Validate Patna Tehsil Names in English (Tyre Grid: PDP)", () => {
        validateTehsilsGridPage(TyreGridUrls.english, 'english','Bihar', 'Patna', ExpectedPatnaTehsils);
    });

    it("37. Validate Patna Tehsil Names in Hindi (Tyre Grid: PDP)", () => {
        validateTehsilsGridPage(TyreGridUrls.hindi, 'hindi', 'बिहार', 'पटना', ExpectedPatnaTehsils);
    });

    it("38. Validate Patna Tehsil Names in Marathi (Tyre Grid: PDP)", () => {
        validateTehsilsGridPage(TyreGridUrls.marathi, 'marathi', 'बिहार', 'पाटणा', ExpectedPatnaTehsils);
    });

    it("39. Validate Patna Tehsil Names in Tamil (Tyre Grid: PDP)", () => {
        validateTehsilsGridPage(TyreGridUrls.tamil, 'tamil', 'பீகார்', 'பாட்னா', ExpectedPatnaTehsils);
    });

    it("40. Validate Patna Tehsil Names in Telugu (Tyre Grid: PDP)", () => {
        validateTehsilsGridPage(TyreGridUrls.telugu, 'telugu', 'బీహార్', 'పాట్నా', ExpectedPatnaTehsils);
    });
});

describe("Tyre Grid: PDP - Rajkot Tehsil Validation", () => {
  it("41. Validate Rajkot Tehsil Names in English (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.english, 'english','Gujarat','Rajkot', ExpectedRajkotTehsils);
  });

  it("42. Validate Rajkot Tehsil Names in Hindi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.hindi,'hindi', 'गुजरात', 'राजकोट', ExpectedRajkotTehsils);
  });

  it("43. Validate Rajkot Tehsil Names in Marathi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.marathi,'marathi', 'गुजरात', 'राजकोट', ExpectedRajkotTehsils);
  });

  it("44. Validate Rajkot Tehsil Names in Tamil (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.tamil, 'tamil', 'குஜராத்', 'ராஜ்கோட்', ExpectedRajkotTehsils);
  });

  it("45. Validate Rajkot Tehsil Names in Telugu (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.telugu, 'telugu','గుజరాత్', 'రాజ్‌కోట్', ExpectedRajkotTehsils);
  });
});

describe("Tyre Grid: PDP - SouthGoa Tehsil Validation", () => {
  it("46. Validate SouthGoa Tehsil Names in English (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.english, 'english','Goa','South Goa', ExpectedSouthGoaTehsils);
  });

  it("47. Validate SouthGoa Tehsil Names in Hindi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.hindi, 'hindi', 'गोवा','साउथ गोवा', ExpectedSouthGoaTehsils);
  });

  it("48. Validate SouthGoa Tehsil Names in Marathi (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.marathi, 'marathi', 'गोवा', 'दक्षिण गोवा', ExpectedSouthGoaTehsils);
  });

  it("49. Validate SouthGoa Tehsil Names in Tamil (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.tamil, 'tamil','கோவா', 'தெற்கு கோவா', ExpectedSouthGoaTehsils);
  });

  it("50. Validate SouthGoa Tehsil Names in Telugu (Tyre Grid: PDP)", () => {
      validateTehsilsGridPage(TyreGridUrls.telugu, 'telugu', 'గోవా', 'దక్షిణ గోవా', ExpectedSouthGoaTehsils);
  });
});



});
