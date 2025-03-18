/// <reference types="cypress" />

import AnakapalleVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/AnakapalleVsTehsilsRepo.cy";
import BarpetaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/BarpetaVsTehsilsRepo.cy";
import DarbhangaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/DarbhangaVsTehsilsRepo.cy";
import DurgVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/DurgVsTehsilsRepo.cy";
import NicobarsVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/NicobarsVsTehsilsRepo.cy";

describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedNicobarsTehsils = NicobarsVsTehsilsRepo.getExpectedNicobarsTehsils();
  const ExpectedAnakapalleTehsils = AnakapalleVsTehsilsRepo.getExpectedAnakapalleTehsils();
  const ExpectedBarpetaTehsils = BarpetaVsTehsilsRepo.getExpectedBarpetaTehsils();
  const ExpectedDarbhangaTehsils = DarbhangaVsTehsilsRepo.getExpectedDarbhangaTehsils();
  const ExpectedDurgTehsils = DurgVsTehsilsRepo.getExpectedDurgTehsils();

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
     cy.get('.filter-img1', { timeout: 15000 }).click({force: true});
     cy.wait(2000);
     cy.get('#service-tab').click();
     cy.wait(2000);
     cy.get('#service > .tractor-new-reviews > :nth-child(1) > .bg-color-white > .new-equipment-anchor').click({force: true});
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

  /*describe("Service Centre Pages - Nicobars Tehsil Validation", () => {
    it("1. Validate Nicobars Tehsil Names in English (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.english, 'english','Andaman And Nicobar Islands', 'Nicobars', ExpectedNicobarsTehsils);
    });

    it("2. Validate Nicobars Tehsil Names in Hindi (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.hindi, 'hindi', 'अंडमान व नोकोबार द्वीप समूह','निकोबार', ExpectedNicobarsTehsils);
    });

    it("3. Validate Nicobars Tehsil Names in Marathi (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.marathi, 'marathi', 'अंदमान आणि निकोबार बेटे','निकोबार', ExpectedNicobarsTehsils);
    });

    it("4. Validate Nicobars Tehsil Names in Tamil (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.tamil, 'tamil', 'அந்தமான் நிக்கோபார் தீவுகள்', 'நிக்கோபார்கள்', ExpectedNicobarsTehsils);
    });

    it("5. Validate Nicobars Tehsil Names in Telugu (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.telugu, 'telugu', 'అండమాన్ మరియు నికోబార్ దీవులు', 'నికోబార్లు', ExpectedNicobarsTehsils);
    });
  });*/

 /*describe("Service Centre Pages - Anakapalle Tehsil Validation", () => {
    it("6. Validate Anakapalle Tehsil Names in English (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.english, 'english','Andhra Pradesh', 'Anakapalle', ExpectedAnakapalleTehsils);
    });

    it("7. Validate Anakapalle Tehsil Names in Hindi (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.hindi, 'hindi','आंध्र प्रदेश', 'अनकापल्ली', ExpectedAnakapalleTehsils);
    });

    it("8. Validate Anakapalle Tehsil Names in Marathi (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.marathi, 'marathi','आंध्र प्रदेश', 'अनकपल्ली', ExpectedAnakapalleTehsils);
    });

    it("9. Validate Anakapalle Tehsil Names in Tamil (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.tamil, 'tamil','ஆந்திரப் பிரதேசம்','அனகப்பள்ளி', ExpectedAnakapalleTehsils);
    });

    it("10. Validate Anakapalle Tehsil Names in Telugu (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.telugu, 'telugu','ఆంధ్రప్రదేశ్', 'అనకాపల్లి', ExpectedAnakapalleTehsils);
    });
  });*/

  /*describe("Service Centre Pages - Barpeta Tehsil Validation", () => {
    it("11. Validate Barpeta Tehsil Names in English (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.english, 'english','Assam', 'Barpeta', ExpectedBarpetaTehsils);
    });

    it("12. Validate Barpeta Tehsil Names in Hindi (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.hindi, 'hindi','असम', 'बारपेटा', ExpectedBarpetaTehsils);
    });

    it("13. Validate Barpeta Tehsil Names in Marathi (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.marathi, 'marathi','आसाम', 'बारपेटा', ExpectedBarpetaTehsils);
    });

    it("14. Validate Barpeta Tehsil Names in Tamil (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.tamil, 'tamil','அசாம்', 'பார்பெட்டா', ExpectedBarpetaTehsils);
    });

    it("15. Validate Barpeta Tehsil Names in Telugu (Service Centre Pages)", () => {
      validateTehsilsMainPageForDealer(ServiceCentrePageUrls.telugu, 'telugu','అస్సాం', 'బార్పేట', ExpectedBarpetaTehsils);
    });
});*/

/*describe("Service Centre Pages - Darbhanga Tehsil Validation", () => {
 it("16. Validate Darbhanga Tehsil Names in English (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.english, 'english','Bihar', 'Darbhanga', ExpectedDarbhangaTehsils);
  });

  it("17. Validate Darbhanga Tehsil Names in Hindi (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.hindi, 'hindi','बिहार', 'दरभंगा', ExpectedDarbhangaTehsils);
  });

  it("18. Validate Darbhanga Tehsil Names in Marathi (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.marathi, 'marathi','बिहार', 'दरभंगा', ExpectedDarbhangaTehsils);
  });

  it("19. Validate Darbhanga Tehsil Names in Tamil (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.tamil, 'tamil','பீகார்', 'தர்பங்கா', ExpectedDarbhangaTehsils);
  });

  it("20. Validate Darbhanga Tehsil Names in Telugu (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.telugu, 'telugu','బీహార్', 'దర్భంగా', ExpectedDarbhangaTehsils);
  });
});

describe("Service Centre Pages - Durg Tehsil Validation", () => {
  it("21. Validate Durg Tehsil Names in English (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.english, 'english','Chhattisgarh', 'Durg', ExpectedDurgTehsils);
  });

  it("22. Validate Durg Tehsil Names in Hindi (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.hindi, 'hindi','छत्तीसगढ', 'दुर्ग', ExpectedDurgTehsils);
  });

  it("23. Validate Durg Tehsil Names in Marathi (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.marathi, 'marathi','छत्तीसगड', 'दुर्ग', ExpectedDurgTehsils);
  });

  it("24. Validate Durg Tehsil Names in Tamil (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.tamil, 'tamil','சத்தீஸ்கர்', 'துர்க்', ExpectedDurgTehsils);
  });

  it("25. Validate Durg Tehsil Names in Telugu (Service Centre Pages)", () => {
    validateTehsilsMainPageForDealer(ServiceCentrePageUrls.telugu, 'telugu','ఛత్తీస్‌గఢ్', 'దుర్గ్', ExpectedDurgTehsils);
  });
});*/

  describe("Service Centre Grid: BLP - Nicobars Tehsil Validation", () => {
    it("26. Validate Nicobars Tehsil Names in English (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.english, 'english','Andaman And Nicobar Islands', 'Nicobars', ExpectedNicobarsTehsils);
    });

    it("27. Validate Nicobars Tehsil Names in Hindi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.hindi, 'hindi', 'अंडमान व नोकोबार द्वीप समूह','निकोबार', ExpectedNicobarsTehsils);
    });

    it("28. Validate Nicobars Tehsil Names in Marathi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.marathi, 'marathi', 'अंदमान आणि निकोबार बेटे','निकोबार', ExpectedNicobarsTehsils);
    });

    it("29. Validate Nicobars Tehsil Names in Tamil (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.tamil, 'tamil', 'அந்தமான் நிக்கோபார் தீவுகள்','நிக்கோபார்கள்', ExpectedNicobarsTehsils);
    });

    it("30. Validate Nicobars Tehsil Names in Telugu (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.telugu, 'telugu', 'అండమాన్ మరియు నికోబార్ దీవులు','నికోబార్లు', ExpectedNicobarsTehsils);
    });
  });

  describe("Service Centre Grid: BLP - Anakapalle Tehsil Validation", () => {
    it("31. Validate Anakapalle Tehsil Names in English (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.english, 'english','Andhra Pradesh', 'Anakapalle', ExpectedAnakapalleTehsils);
    });

    it("32. Validate Anakapalle Tehsil Names in Hindi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.hindi, 'hindi','आंध्र प्रदेश', 'अनकापल्ली', ExpectedAnakapalleTehsils);
    });

    it("33. Validate Anakapalle Tehsil Names in Marathi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.marathi, 'marathi', 'आंध्र प्रदेश', 'अनकपल्ली', ExpectedAnakapalleTehsils);
    });

    it("34. Validate Anakapalle Tehsil Names in Tamil (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.tamil, 'tamil', 'ஆந்திரப் பிரதேசம்','அனகப்பள்ளி', ExpectedAnakapalleTehsils);
    });

    it("35. Validate Anakapalle Tehsil Names in Telugu (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.telugu, 'telugu', 'ఆంధ్రప్రదేశ్', 'అనకాపల్లి', ExpectedAnakapalleTehsils);
    });
  });

describe("Service Centre Grid: BLP - Barpeta Tehsil Validation", () => {
    it("36. Validate Barpeta Tehsil Names in English (Service Centre Grid)", () => {
        validateTehsilsGridPageForDealer(ServiceCentreGridUrls.english, 'english','Assam', 'Barpeta', ExpectedBarpetaTehsils);
    });

    it("37. Validate Barpeta Tehsil Names in Hindi (Service Centre Grid)", () => {
        validateTehsilsGridPageForDealer(ServiceCentreGridUrls.hindi, 'hindi', 'असम', 'बारपेटा', ExpectedBarpetaTehsils);
    });

    it("38. Validate Barpeta Tehsil Names in Marathi (Service Centre Grid)", () => {
        validateTehsilsGridPageForDealer(ServiceCentreGridUrls.marathi, 'marathi', 'आसाम', 'बारपेटा', ExpectedBarpetaTehsils);
    });

    it("39. Validate Barpeta Tehsil Names in Tamil (Service Centre Grid)", () => {
        validateTehsilsGridPageForDealer(ServiceCentreGridUrls.tamil, 'tamil', 'அசாம்', 'பார்பெட்டா', ExpectedBarpetaTehsils);
    });

    it("40. Validate Barpeta Tehsil Names in Telugu (Service Centre Grid)", () => {
        validateTehsilsGridPageForDealer(ServiceCentreGridUrls.telugu, 'telugu', 'అస్సాం', 'బార్పేట', ExpectedBarpetaTehsils);
    });
});

describe("Service Centre Grid: BLP - Darbhanga Tehsil Validation", () => {
  it("41. Validate Darbhanga Tehsil Names in English (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.english, 'english','Bihar','Darbhanga', ExpectedDarbhangaTehsils);
  });

  it("42. Validate Darbhanga Tehsil Names in Hindi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.hindi,'hindi', 'बिहार', 'दरभंगा', ExpectedDarbhangaTehsils);
  });

  it("43. Validate Darbhanga Tehsil Names in Marathi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.marathi,'marathi', 'बिहार', 'दरभंगा', ExpectedDarbhangaTehsils);
  });

  it("44. Validate Darbhanga Tehsil Names in Tamil (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.tamil, 'tamil', 'பீகார்', 'தர்பங்கா', ExpectedDarbhangaTehsils);
  });

  it("45. Validate Darbhanga Tehsil Names in Telugu (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.telugu, 'telugu','బీహార్', 'దర్భంగా', ExpectedDarbhangaTehsils);
  });
});

describe("Service Centre Grid: BLP - Durg Tehsil Validation", () => {
  it("46. Validate Durg Tehsil Names in English (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.english, 'english','Chhattisgarh','Durg', ExpectedDurgTehsils);
  });

  it("47. Validate Durg Tehsil Names in Hindi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.hindi, 'hindi', 'छत्तीसगढ','दुर्ग', ExpectedDurgTehsils);
  });

  it("48. Validate Durg Tehsil Names in Marathi (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.marathi, 'marathi', 'छत्तीसगड', 'दुर्ग', ExpectedDurgTehsils);
  });

  it("49. Validate Durg Tehsil Names in Tamil (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.tamil, 'tamil','சத்தீஸ்கர்', 'துர்க்', ExpectedDurgTehsils);
  });

  it("50. Validate Durg Tehsil Names in Telugu (Service Centre Grid)", () => {
      validateTehsilsGridPageForDealer(ServiceCentreGridUrls.telugu, 'telugu', 'ఛత్తీస్‌గఢ్', 'దుర్గ్', ExpectedDurgTehsils);
  });
});

});
