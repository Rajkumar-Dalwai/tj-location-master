/// <reference types="cypress" />

import AsansolVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/AsansolVsTehsilsRepo.cy";
import WarangalVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/WarangalVsTehsilsRepo.cy";
import ThrissurVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/ThrissurVsTehsilsRepo.cy";
import SonipatVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/SonipatVsTehsilsRepo.cy";
import MirzapurVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/MirzapurVsTehsilsRepo.cy";


describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedAsansolTehsils = AsansolVsTehsilsRepo.getExpectedAsansolTehsils();
  const ExpectedWarangalTehsils = WarangalVsTehsilsRepo.getExpectedWarangalTehsils();
  const ExpectedThrissurTehsils = ThrissurVsTehsilsRepo.getExpectedThrissurTehsils();
  const ExpectedSonipatTehsils = SonipatVsTehsilsRepo.getExpectedSonipatTehsils();
  const ExpectedMirzapurTehsils = MirzapurVsTehsilsRepo.getExpectedMirzapurTehsils();

  const TractorPageUrls = {
    english: `${Cypress.env('url')}all-brands/`,
    hindi: `${Cypress.env('url')}hi/all-brands/`,
    marathi: `${Cypress.env('url')}mr/all-brands/`,
    tamil: `${Cypress.env('url')}ta/all-brands/`,
    telugu: `${Cypress.env('url')}te/all-brands/`,
  };

  const TractorGridUrls = {
    english: `${Cypress.env('url')}`,
    hindi: `${Cypress.env('url')}hi/`,
    marathi: `${Cypress.env('url')}mr/`,
    tamil: `${Cypress.env('url')}ta/`,
    telugu: `${Cypress.env('url')}te/`,
  };

 // Reusable function for Main Page

const validateTehsilsMainPageForTractor = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForTractor) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  // Click on the first Tractor card
  cy.get('#mahindranew > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate')
      .first()
      .click();
  cy.wait(2000);

  // Select state and district from dropdowns
  cy.get('#states').should('be.visible').select(stateName);
  cy.wait(2000);
  cy.get('#gorp_form_dist_id').should('be.visible').select(districtName);
  cy.wait(2000);

  cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');

  // Validate the length of dropdown options excluding the first option
  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .should('have.length', expectedTehsilsForTractor.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedTehsilsForTractor[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedTehsilsForTractor.some(t => t[languageKey] === actual)) {
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

// Reusable function for Grid Page

const validateTehsilsGridPageForTractor = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForTractor) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  cy.get('#popularnew > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate').click({ force: true });
  cy.wait(2000);
  cy.get('.modal.show #states').should('be.visible').select(stateName);
  cy.wait(2000);
  cy.get('.modal.show #gorp_form_dist_id').should('be.visible').select(districtName);
  cy.wait(2000);

  cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .should('have.length', expectedTehsilsForTractor.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedTehsilsForTractor[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedTehsilsForTractor.some(t => t[languageKey] === actual)) {
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

  describe("Tractor Pages - Asansol Tehsil Validation", () => {
    it("1. Validate Asansol Tehsil Names in English (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.english, 'english','West Bengal', 'Asansol', ExpectedAsansolTehsils);
    });

    it("2. Validate Asansol Tehsil Names in Hindi (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.hindi, 'hindi', 'पश्चिम बंगाल','आसनसोल', ExpectedAsansolTehsils);
    });

    it("3. Validate Asansol Tehsil Names in Marathi (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.marathi, 'marathi', 'पश्चिम बंगाल','आसनसोल', ExpectedAsansolTehsils);
    });

    it("4. Validate Asansol Tehsil Names in Tamil (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.tamil, 'tamil', 'மேற்கு வங்காளம்', 'அசன்சோல்', ExpectedAsansolTehsils);
    });

    it("5. Validate Asansol Tehsil Names in Telugu (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.telugu, 'telugu', 'పశ్చిమ బెంగాల్', 'అసన్సోల్', ExpectedAsansolTehsils);
    }); 
  });

 describe("Tractor Pages - Warangal Tehsil Validation", () => {
    it("6. Validate Warangal Tehsil Names in English (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.english, 'english','Telangana', 'Warangal', ExpectedWarangalTehsils);
    });

    it("7. Validate Warangal Tehsil Names in Hindi (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.hindi, 'hindi','तेलंगाना', 'वारंगल', ExpectedWarangalTehsils);
    });

    it("8. Validate Warangal Tehsil Names in Marathi (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.marathi, 'marathi','तेलंगणा', 'वरंगल', ExpectedWarangalTehsils);
    });

    it("9. Validate Warangal Tehsil Names in Tamil (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.tamil, 'tamil','தெலுங்கானா','வாரங்கல்', ExpectedWarangalTehsils);
    });

    it("10. Validate Warangal Tehsil Names in Telugu (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.telugu, 'telugu','తెలంగాణ', 'వరంగల్', ExpectedWarangalTehsils);
    });
  });

 describe("Tractor Pages - Thrissur Tehsil Validation", () => {
    it("11. Validate Thrissur Tehsil Names in English (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.english, 'english','Kerala', 'Thrissur', ExpectedThrissurTehsils);
    });

    it("12. Validate Thrissur Tehsil Names in Hindi (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.hindi, 'hindi','केरल', 'त्रिशूर', ExpectedThrissurTehsils);
    });

    it("13. Validate Thrissur Tehsil Names in Marathi (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.marathi, 'marathi','केरळा', 'त्रिशूर', ExpectedThrissurTehsils);
    });

    it("14. Validate Thrissur Tehsil Names in Tamil (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.tamil, 'tamil','கேரளா', 'திருச்சூர்', ExpectedThrissurTehsils);
    });

    it("15. Validate Thrissur Tehsil Names in Telugu (Tractor Pages)", () => {
      validateTehsilsMainPageForTractor(TractorPageUrls.telugu, 'telugu','కేరళ', 'త్రిస్సూర్', ExpectedThrissurTehsils);
    });
});

describe("Tractor Pages - Sonipat Tehsil Validation", () => {
 it("16. Validate Sonipat Tehsil Names in English (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.english, 'english','Haryana', 'Sonipat', ExpectedSonipatTehsils);
  });

  it("17. Validate Sonipat Tehsil Names in Hindi (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.hindi, 'hindi','हरियाणा', 'सोनीपत', ExpectedSonipatTehsils);
  });

  it("18. Validate Sonipat Tehsil Names in Marathi (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.marathi, 'marathi','हरियाणा', 'सोनीपत', ExpectedSonipatTehsils);
  });

  it("19. Validate Sonipat Tehsil Names in Tamil (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.tamil, 'tamil','ஹரியானா', 'சோனிபட்', ExpectedSonipatTehsils);
  });

  it("20. Validate Sonipat Tehsil Names in Telugu (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.telugu, 'telugu','హర్యానా', 'సోనిపట్', ExpectedSonipatTehsils);
  });
});

describe("Tractor Pages - Mirzapur Tehsil Validation", () => {
  it("21. Validate Mirzapur Tehsil Names in English (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.english, 'english','Uttar Pradesh', 'Mirzapur', ExpectedMirzapurTehsils);
  });

  it("22. Validate Mirzapur Tehsil Names in Hindi (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.hindi, 'hindi','उत्तर प्रदेश', 'मिर्ज़ापुर', ExpectedMirzapurTehsils);
  });

  it("23. Validate Mirzapur Tehsil Names in Marathi (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.marathi, 'marathi','उत्तर प्रदेश', 'मिर्झापूर', ExpectedMirzapurTehsils);
  });

  it("24. Validate Mirzapur Tehsil Names in Tamil (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.tamil, 'tamil','உத்தரப்பிரதேசம்', 'மிர்சாபூர்', ExpectedMirzapurTehsils);
  });

  it("25. Validate Mirzapur Tehsil Names in Telugu (Tractor Pages)", () => {
    validateTehsilsMainPageForTractor(TractorPageUrls.telugu, 'telugu','ఉత్తర ప్రదేశ్', 'మీర్జాపూర్', ExpectedMirzapurTehsils);
  });
});

  describe("Tractor Grid: HP - Asansol Tehsil Validation", () => {
    it("26. Validate Asansol Tehsil Names in English (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.english, 'english','West Bengal', 'Asansol', ExpectedAsansolTehsils);
    });

    it("27. Validate Asansol Tehsil Names in Hindi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'पश्चिम बंगाल','आसनसोल', ExpectedAsansolTehsils);
    });

    it("28. Validate Asansol Tehsil Names in Marathi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'पश्चिम बंगाल','आसनसोल', ExpectedAsansolTehsils);
    });

    it("29. Validate Asansol Tehsil Names in Tamil (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'மேற்கு வங்காளம்','அசன்சோல்', ExpectedAsansolTehsils);
    });

    it("30. Validate Asansol Tehsil Names in Telugu (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'పశ్చిమ బెంగాల్','అసన్సోల్', ExpectedAsansolTehsils);
    });
  });

  describe("Tractor Grid: HP - Warangal Tehsil Validation", () => {
    it("31. Validate Warangal Tehsil Names in English (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.english, 'english','Telangana', 'Warangal', ExpectedWarangalTehsils);
    });

    it("32. Validate Warangal Tehsil Names in Hindi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.hindi, 'hindi','तेलंगाना', 'वारंगल', ExpectedWarangalTehsils);
    });

    it("33. Validate Warangal Tehsil Names in Marathi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'तेलंगणा', 'वरंगल', ExpectedWarangalTehsils);
    });

    it("34. Validate Warangal Tehsil Names in Tamil (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'தெலுங்கானா','வாரங்கல்', ExpectedWarangalTehsils);
    });

    it("35. Validate Warangal Tehsil Names in Telugu (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'తెలంగాణ', 'వరంగల్', ExpectedWarangalTehsils);
    });
  });

describe("Tractor Grid: HP - Thrissur Tehsil Validation", () => {
    it("36. Validate Thrissur Tehsil Names in English (Tractor Grid: HP)", () => {
        validateTehsilsGridPageForTractor(TractorGridUrls.english, 'english','Kerala', 'Thrissur', ExpectedThrissurTehsils);
    });

    it("37. Validate Thrissur Tehsil Names in Hindi (Tractor Grid: HP)", () => {
        validateTehsilsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'केरल', 'त्रिशूर', ExpectedThrissurTehsils);
    });

    it("38. Validate Thrissur Tehsil Names in Marathi (Tractor Grid: HP)", () => {
        validateTehsilsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'केरळा', 'त्रिशूर', ExpectedThrissurTehsils);
    });

    it("39. Validate Thrissur Tehsil Names in Tamil (Tractor Grid: HP)", () => {
        validateTehsilsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'கேரளா', 'திருச்சூர்', ExpectedThrissurTehsils);
    });

    it("40. Validate Thrissur Tehsil Names in Telugu (Tractor Grid: HP)", () => {
        validateTehsilsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'కేరళ', 'త్రిస్సూర్', ExpectedThrissurTehsils);
    });
});

describe("Tractor Grid: HP - Sonipat Tehsil Validation", () => {
  it("41. Validate Sonipat Tehsil Names in English (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.english, 'english','Haryana','Sonipat', ExpectedSonipatTehsils);
  });

  it("42. Validate Sonipat Tehsil Names in Hindi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.hindi,'hindi', 'हरियाणा', 'सोनीपत', ExpectedSonipatTehsils);
  });

  it("43. Validate Sonipat Tehsil Names in Marathi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.marathi,'marathi', 'हरियाणा', 'सोनीपत', ExpectedSonipatTehsils);
  });

  it("44. Validate Sonipat Tehsil Names in Tamil (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'ஹரியானா', 'சோனிபட்', ExpectedSonipatTehsils);
  });

  it("45. Validate Sonipat Tehsil Names in Telugu (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.telugu, 'telugu','హర్యానా', 'సోనిపట్', ExpectedSonipatTehsils);
  });
});

describe("Tractor Grid: HP - Uttar Pradesh Tehsil Validation", () => {
  it("46. Validate Uttar Pradesh Tehsil Names in English (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.english, 'english','Uttar Pradesh','Mirzapur', ExpectedMirzapurTehsils);
  });

  it("47. Validate Uttar Pradesh Tehsil Names in Hindi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'उत्तर प्रदेश','मिर्ज़ापुर', ExpectedMirzapurTehsils);
  });

  it("48. Validate Uttar Pradesh Tehsil Names in Marathi (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'उत्तर प्रदेश', 'मिर्झापूर', ExpectedMirzapurTehsils);
  });

  it("49. Validate Uttar Pradesh Tehsil Names in Tamil (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.tamil, 'tamil','உத்தரப்பிரதேசம்', 'மிர்சாபூர்', ExpectedMirzapurTehsils);
  });

  it("50. Validate Uttar Pradesh Tehsil Names in Telugu (Tractor Grid: HP)", () => {
      validateTehsilsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'ఉత్తర ప్రదేశ్', 'మీర్జాపూర్', ExpectedMirzapurTehsils);
  });
});

});
