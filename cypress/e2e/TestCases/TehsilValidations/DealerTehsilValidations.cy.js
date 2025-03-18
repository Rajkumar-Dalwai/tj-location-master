/// <reference types="cypress" />

import KurnoolVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/KurnoolVsTehsilsRepo.cy";
import NamsaiVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/NamsaiVsTehsilsRepo.cy";
import AmritsarVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/AmritsarVsTehsilsRepo.cy";
import Belagavi_BelgaumVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/Belagavi_BelgaumVsTehsilsRepo.cy";
import DewasVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/DewasVsTehsilsRepo.cy";


describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedKurnoolTehsils = KurnoolVsTehsilsRepo.getExpectedKurnoolTehsils();
  const ExpectedNamsaiTehsils = NamsaiVsTehsilsRepo.getExpectedNamsaiTehsils();
  const ExpectedAmritsarTehsils = AmritsarVsTehsilsRepo.getExpectedAmritsarTehsils();
  const ExpectedBelagavi_BelgaumTehsils = Belagavi_BelgaumVsTehsilsRepo.getExpectedBelagavi_BelgaumTehsils();
  const ExpectedDewasTehsils = DewasVsTehsilsRepo.getExpectedDewasTehsils();


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

  const validateTehsilsMainPageForDealer = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForDealer) => {
    cy.visit(pageUrl);
    cy.wait(2000);
    cy.get(':nth-child(7) > .bg-color-white > .new-equipment-anchor').first().click();
    cy.wait(2000);
    cy.get('#states').select(stateName,{ force: true });
    cy.wait(2000);
    cy.get('#gorp_form_dist_id').select(districtName,{ force: true });
  
    cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');
  //cy.wait('@loadTehsils', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
  
  cy.get(':nth-child(6) > .custom-select')
  .find('option')
  .not(':first')
  .should('have.length', expectedTehsilsForDealer.length);

  let mismatches = [];
  cy.get(':nth-child(6) > .custom-select')
  .find('option')
  .not(':first')
  .each(($option, index) => {
    const actual = $option.text().trim();
    const expected = expectedTehsilsForDealer[index]?.[languageKey];
    if (actual !== expected) mismatches.push({ index, actual, expected });
  })
  .then(() => {
    if (mismatches.length) {
      cy.log('Mismatched Tehsils:', mismatches);
      throw new Error(`Tehsil validation failed. Mismatched Tehsils: ${JSON.stringify(mismatches)}`);
    } else {
      cy.log(`All Tehsils are matched accurately in ${languageKey}!`);
    }
  });
  };

 // Reusable function for Grid Page
    const validateTehsilsGridPageForDealer = (pageUrl, languageKey, stateName,districtName, expectedTehsilsForDealer) => {
     cy.visit(pageUrl);
     cy.scrollTo('bottom', { duration: 5000 });
     cy.get('.cross', { timeout: 15000 }).click({force: true});
     cy.wait(2000);
     cy.get(':nth-child(1) > .bg-color-white > .new-equipment-anchor').click({force: true});
     cy.wait(2000);
     cy.get('.modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(4) > #states').select(stateName, { force: true });
     cy.wait(2000);
     cy.get('.modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(5) > #gorp_form_dist_id').select(districtName, { force: true });

    cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');
  //cy.wait('@loadTehsils', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
  
    // Validate the length of dropdown options excluding the first option
    cy.get('.modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(6) > .custom-select')
    .find('option')
    .not(':first')
    .should('have.length', expectedTehsilsForDealer.length);
  
    let mismatches = [];
    cy.get('.modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(6) > .custom-select')
    .find('option')
    .not(':first')
    .each(($option, index) => {
      const actual = $option.text().trim();
      const expected = expectedTehsilsForDealer[index]?.[languageKey];
      if (actual !== expected) mismatches.push({ index, actual, expected });
    })
    .then(() => {
      if (mismatches.length) {
        cy.log('Mismatched Tehsils:', mismatches);
        throw new Error(`Tehsil validation failed. Mismatched Tehsils: ${JSON.stringify(mismatches)}`);
      } else {
        cy.log(`All Tehsils are matched accurately in ${languageKey}!`);
      }
    });
};

  // Test cases

  describe("Dealer Pages - Kurnool Tehsil Validation", () => {
    it("1. Validate Kurnool Tehsil Names in English (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.english, 'english','Andhra Pradesh', 'Kurnool', ExpectedKurnoolTehsils);
    });

    it("2. Validate Kurnool Tehsil Names in Hindi (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.hindi, 'hindi', 'आंध्र प्रदेश','कुरनूल', ExpectedKurnoolTehsils);
    });

    it("3. Validate Kurnool Tehsil Names in Marathi (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.marathi, 'marathi', 'आंध्र प्रदेश','कर्नूल', ExpectedKurnoolTehsils);
    });

    it("4. Validate Kurnool Tehsil Names in Tamil (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.tamil, 'tamil', 'ஆந்திரப் பிரதேசம்', 'கர்னூல்', ExpectedKurnoolTehsils);
    });

    it("5. Validate Kurnool Tehsil Names in Telugu (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.telugu, 'telugu', 'ఆంధ్రప్రదేశ్', 'కర్నూలు', ExpectedKurnoolTehsils);
    }); 
  });

 describe("Dealer Pages - Namsai Tehsil Validation", () => {
    it("6. Validate Namsai Tehsil Names in English (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.english, 'english','Arunachal Pradesh', 'Namsai', ExpectedNamsaiTehsils);
    });

    it("7. Validate Namsai Tehsil Names in Hindi (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.hindi, 'hindi','अरुणाचल प्रदेश', 'नामसाई', ExpectedNamsaiTehsils);
    });

    it("8. Validate Namsai Tehsil Names in Marathi (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.marathi, 'marathi','अरुणाचल प्रदेश', 'नामसाई', ExpectedNamsaiTehsils);
    });

    it("9. Validate Namsai Tehsil Names in Tamil (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.tamil, 'tamil','அருணாச்சல பிரதேசம்','நம்சாய்', ExpectedNamsaiTehsils);
    });

    it("10. Validate Namsai Tehsil Names in Telugu (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.telugu, 'telugu','అరుణాచల్ ప్రదేశ్', 'నమ్సాయి', ExpectedNamsaiTehsils);
    });
  });

  describe("Dealer Pages - Amritsar Tehsil Validation", () => {
    it("11. Validate Amritsar Tehsil Names in English (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.english, 'english','Punjab', 'Amritsar', ExpectedAmritsarTehsils);
    });

    it("12. Validate Amritsar Tehsil Names in Hindi (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.hindi, 'hindi','पंजाब', 'अमृतसर', ExpectedAmritsarTehsils);
    });

    it("13. Validate Amritsar Tehsil Names in Marathi (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.marathi, 'marathi','पंजाब', 'अमृतसर', ExpectedAmritsarTehsils);
    });

    it("14. Validate Amritsar Tehsil Names in Tamil (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.tamil, 'tamil','பஞ்சாப்', 'அமிர்தசரஸ்', ExpectedAmritsarTehsils);
    });

    it("15. Validate Amritsar Tehsil Names in Telugu (Dealer Pages)", () => {
      validateTehsilsMainPageForDealer(DealerPageUrls.telugu, 'telugu','పంజాబ్', 'అమృత్‌సర్', ExpectedAmritsarTehsils);
    });
});

describe("Dealer Pages - Belagavi (Belgaum) Tehsil Validation", () => {
 it("16. Validate Belagavi (Belgaum) Tehsil Names in English (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.english, 'english','Karnataka', 'Belagavi (Belgaum)', ExpectedBelagavi_BelgaumTehsils);
  });

  it("17. Validate Belagavi (Belgaum) Tehsil Names in Hindi (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.hindi, 'hindi','कर्नाटक', 'बेलगावी (बेलगाम)', ExpectedBelagavi_BelgaumTehsils);
  });

  it("18. Validate Belagavi (Belgaum) Tehsil Names in Marathi (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.marathi, 'marathi','कर्नाटक', 'बेलागावी', ExpectedBelagavi_BelgaumTehsils);
  });

  it("19. Validate Belagavi (Belgaum) Tehsil Names in Tamil (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.tamil, 'tamil','கர்நாடகா', 'பெலகாவி', ExpectedBelagavi_BelgaumTehsils);
  });

  it("20. Validate Belagavi (Belgaum) Tehsil Names in Telugu (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.telugu, 'telugu','కర్ణాటక', 'బెలగావి', ExpectedBelagavi_BelgaumTehsils);
  });
});

describe("Dealer Pages - Dewas Tehsil Validation", () => {
  it("21. Validate Dewas Tehsil Names in English (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.english, 'english','Madhya Pradesh', 'Dewas', ExpectedDewasTehsils);
  });

  it("22. Validate Dewas Tehsil Names in Hindi (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.hindi, 'hindi','मध्य प्रदेश', 'देवास', ExpectedDewasTehsils);
  });

  it("23. Validate Dewas Tehsil Names in Marathi (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.marathi, 'marathi','मध्य प्रदेश', 'देवास', ExpectedDewasTehsils);
  });

  it("24. Validate Dewas Tehsil Names in Tamil (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.tamil, 'tamil','மத்திய பிரதேசம்', 'தேவாஸ்', ExpectedDewasTehsils);
  });

  it("25. Validate Dewas Tehsil Names in Telugu (Dealer Pages)", () => {
    validateTehsilsMainPageForDealer(DealerPageUrls.telugu, 'telugu','మధ్యప్రదేశ్', 'దేవాస్', ExpectedDewasTehsils);
  });
});

  /*describe("Dealer Grid: PDP - Kurnool Tehsil Validation", () => {
    it("26. Validate Kurnool Tehsil Names in English (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.english, 'english','Andhra Pradesh', 'Kurnool', ExpectedKurnoolTehsils);
    });

    it("27. Validate Kurnool Tehsil Names in Hindi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'आंध्र प्रदेश','कुरनूल', ExpectedKurnoolTehsils);
    });

    it("28. Validate Kurnool Tehsil Names in Marathi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'आंध्र प्रदेश','कर्नूल', ExpectedKurnoolTehsils);
    });

    it("29. Validate Kurnool Tehsil Names in Tamil (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'ஆந்திரப் பிரதேசம்','கர்னூல்', ExpectedKurnoolTehsils);
    });

    it("30. Validate Kurnool Tehsil Names in Telugu (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'ఆంధ్రప్రదేశ్','కర్నూలు', ExpectedKurnoolTehsils);
    });
  });

  describe("Dealer Grid: PDP - Namsai Tehsil Validation", () => {
    it("31. Validate Namsai Tehsil Names in English (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.english, 'english','Arunachal Pradesh', 'Namsai', ExpectedNamsaiTehsils);
    });

    it("32. Validate Namsai Tehsil Names in Hindi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.hindi, 'hindi','अरुणाचल प्रदेश', 'नामसाई', ExpectedNamsaiTehsils);
    });

    it("33. Validate Namsai Tehsil Names in Marathi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'अरुणाचल प्रदेश', 'नामसाई', ExpectedNamsaiTehsils);
    });

    it("34. Validate Namsai Tehsil Names in Tamil (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'அருணாச்சல பிரதேசம்','நம்சாய்', ExpectedNamsaiTehsils);
    });

    it("35. Validate Namsai Tehsil Names in Telugu (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'అరుణాచల్ ప్రదేశ్', 'నమ్సాయి', ExpectedNamsaiTehsils);
    });
  });

describe("Dealer Grid: PDP - Amritsar Tehsil Validation", () => {
    it("36. Validate Amritsar Tehsil Names in English (Dealer Grid: PDP)", () => {
        validateTehsilsGridPageForDealer(DealerGridUrls.english, 'english','Punjab', 'Amritsar', ExpectedAmritsarTehsils);
    });

    it("37. Validate Amritsar Tehsil Names in Hindi (Dealer Grid: PDP)", () => {
        validateTehsilsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'पंजाब', 'अमृतसर', ExpectedAmritsarTehsils);
    });

    it("38. Validate Amritsar Tehsil Names in Marathi (Dealer Grid: PDP)", () => {
        validateTehsilsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'पंजाब', 'अमृतसर', ExpectedAmritsarTehsils);
    });

    it("39. Validate Amritsar Tehsil Names in Tamil (Dealer Grid: PDP)", () => {
        validateTehsilsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'பஞ்சாப்', 'அமிர்தசரஸ்', ExpectedAmritsarTehsils);
    });

    it("40. Validate Amritsar Tehsil Names in Telugu (Dealer Grid: PDP)", () => {
        validateTehsilsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'పంజాబ్', 'అమృత్‌సర్', ExpectedAmritsarTehsils);
    });
});

describe("Dealer Grid: PDP - Belagavi (Belgaum) Tehsil Validation", () => {
  it("41. Validate Belagavi (Belgaum) Tehsil Names in English (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.english, 'english','Karnataka','Belagavi (Belgaum)', ExpectedBelagavi_BelgaumTehsils);
  });

  it("42. Validate Belagavi (Belgaum) Tehsil Names in Hindi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.hindi,'hindi', 'कर्नाटक', 'बेलगावी (बेलगाम)', ExpectedBelagavi_BelgaumTehsils);
  });

  it("43. Validate Belagavi (Belgaum) Tehsil Names in Marathi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.marathi,'marathi', 'कर्नाटक', 'बेलागावी', ExpectedBelagavi_BelgaumTehsils);
  });

  it("44. Validate Belagavi (Belgaum) Tehsil Names in Tamil (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.tamil, 'tamil', 'கர்நாடகா', 'பெலகாவி', ExpectedBelagavi_BelgaumTehsils);
  });

  it("45. Validate Belagavi (Belgaum) Tehsil Names in Telugu (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.telugu, 'telugu','కర్ణాటక', 'బెలగావి', ExpectedBelagavi_BelgaumTehsils);
  });
});

describe("Dealer Grid: PDP - SouthGoa Tehsil Validation", () => {
  it("46. Validate SouthGoa Tehsil Names in English (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.english, 'english','Madhya Pradesh','Dewas', ExpectedDewasTehsils);
  });

  it("47. Validate SouthGoa Tehsil Names in Hindi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.hindi, 'hindi', 'मध्य प्रदेश','देवास', ExpectedDewasTehsils);
  });

  it("48. Validate SouthGoa Tehsil Names in Marathi (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.marathi, 'marathi', 'मध्य प्रदेश', 'देवास', ExpectedDewasTehsils);
  });

  it("49. Validate SouthGoa Tehsil Names in Tamil (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.tamil, 'tamil','மத்திய பிரதேசம்', 'தேவாஸ்', ExpectedDewasTehsils);
  });

  it("50. Validate SouthGoa Tehsil Names in Telugu (Dealer Grid: PDP)", () => {
      validateTehsilsGridPageForDealer(DealerGridUrls.telugu, 'telugu', 'మధ్యప్రదేశ్', 'దేవాస్', ExpectedDewasTehsils);
  });
});*/

});
