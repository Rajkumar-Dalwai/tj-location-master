/// <reference types="cypress" />

import NewDelhiVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/NewDelhiVsTehsilsRepo.cy";
import AhmedabadVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/AhmedabadVsTehsilsRepo.cy";
import GurugramVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/GurugramVsTehsilsRepo.cy";
import ShimlaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/ShimlaVsTehsilsRepo.cy";
import JammuVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/JammuVsTehsilsRepo.cy";


describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedNewDelhiTehsils = NewDelhiVsTehsilsRepo.getExpectedNewDelhiTehsils();
  const ExpectedAhmedabadTehsils = AhmedabadVsTehsilsRepo.getExpectedAhmedabadTehsils();
  const ExpectedGurugramTehsils = GurugramVsTehsilsRepo.getExpectedGurugramTehsils();
  const ExpectedShimlaTehsils = ShimlaVsTehsilsRepo.getExpectedShimlaTehsils();
  const ExpectedJammuTehsils = JammuVsTehsilsRepo.getExpectedJammuTehsils();


  const ImplementPageUrls = {
    english: `${Cypress.env('url')}tractor-implements/`,
    hindi: `${Cypress.env('url')}hi/tractor-implements/`,
    marathi: `${Cypress.env('url')}mr/tractor-implements/`,
    tamil: `${Cypress.env('url')}ta/tractor-implements/`,
    telugu: `${Cypress.env('url')}te/tractor-implements/`,
  };

  const ImplementGridUrls = {
    english: `${Cypress.env('url')}`,
    hindi: `${Cypress.env('url')}hi/`,
    marathi: `${Cypress.env('url')}mr/`,
    tamil: `${Cypress.env('url')}ta/`,
    telugu: `${Cypress.env('url')}te/`,
  };

 // Reusable function for Main Page

const validateTehsilsMainPageForImplements = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForImplement) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  // Click on the first implement card
  cy.get(':nth-child(3) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor')
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
      .should('have.length', expectedTehsilsForImplement.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedTehsilsForImplement[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedTehsilsForImplement.some(t => t[languageKey] === actual)) {
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

const validateTehsilsGridPageForImplements = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForImplement) => {
  cy.visit(pageUrl);
  cy.wait(2000);
  cy.get(':nth-child(2) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click({ force: true });
  cy.wait(2000);
  cy.get('.modal.show #states').should('be.visible').select(stateName);
  cy.wait(2000);
  cy.get('.modal.show #gorp_form_dist_id').should('be.visible').select(districtName);
  cy.wait(2000);

  cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .should('have.length', expectedTehsilsForImplement.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedTehsilsForImplement[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedTehsilsForImplement.some(t => t[languageKey] === actual)) {
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

  describe("Implement Pages - New Delhi Tehsil Validation", () => {
    it("1. Validate New Delhi Tehsil Names in English (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.english, 'english','Delhi', 'New Delhi', ExpectedNewDelhiTehsils);
    });

    it("2. Validate New Delhi Tehsil Names in Hindi (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.hindi, 'hindi', 'दिल्ली','नई दिल्ली', ExpectedNewDelhiTehsils);
    });

    it("3. Validate New Delhi Tehsil Names in Marathi (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.marathi, 'marathi', 'दिल्ली','नवी दिल्ली', ExpectedNewDelhiTehsils);
    });

    it("4. Validate New Delhi Tehsil Names in Tamil (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.tamil, 'tamil', 'டெல்லி', 'புது தில்லி', ExpectedNewDelhiTehsils);
    });

    it("5. Validate New Delhi Tehsil Names in Telugu (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.telugu, 'telugu', 'ఢిల్లీ', 'న్యూఢిల్లీ', ExpectedNewDelhiTehsils);
    }); 
  });

 describe("Implement Pages - Ahmedabad Tehsil Validation", () => {
    it("6. Validate Ahmedabad Tehsil Names in English (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.english, 'english','Gujarat', 'Ahmedabad', ExpectedAhmedabadTehsils);
    });

    it("7. Validate Ahmedabad Tehsil Names in Hindi (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.hindi, 'hindi','गुजरात', 'अहमदाबाद', ExpectedAhmedabadTehsils);
    });

    it("8. Validate Ahmedabad Tehsil Names in Marathi (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.marathi, 'marathi','गुजरात', 'अहमदाबाद', ExpectedAhmedabadTehsils);
    });

    it("9. Validate Ahmedabad Tehsil Names in Tamil (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.tamil, 'tamil','குஜராத்','அகமதாபாத்', ExpectedAhmedabadTehsils);
    });

    it("10. Validate Ahmedabad Tehsil Names in Telugu (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.telugu, 'telugu','గుజరాత్', 'అహ్మదాబాద్', ExpectedAhmedabadTehsils);
    });
  });

  describe("Implement Pages - Gurugram Tehsil Validation", () => {
    it("11. Validate Gurugram Tehsil Names in English (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.english, 'english','Haryana', 'Gurugram', ExpectedGurugramTehsils);
    });

    it("12. Validate Gurugram Tehsil Names in Hindi (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.hindi, 'hindi','हरियाणा', 'गुरूग्राम', ExpectedGurugramTehsils);
    });

    it("13. Validate Gurugram Tehsil Names in Marathi (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.marathi, 'marathi','हरियाणा', 'गुरुग्राम', ExpectedGurugramTehsils);
    });

    it("14. Validate Gurugram Tehsil Names in Tamil (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.tamil, 'tamil','ஹரியானா', 'குருகிராம்', ExpectedGurugramTehsils);
    });

    it("15. Validate Gurugram Tehsil Names in Telugu (Implement Pages)", () => {
      validateTehsilsMainPageForImplements(ImplementPageUrls.telugu, 'telugu','హర్యానా', 'గురుగ్రామ్', ExpectedGurugramTehsils);
    });
});

describe("Implement Pages - Shimla Tehsil Validation", () => {
 it("16. Validate Shimla Tehsil Names in English (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.english, 'english','Himachal Pradesh', 'Shimla', ExpectedShimlaTehsils);
  });

  it("17. Validate Shimla Tehsil Names in Hindi (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.hindi, 'hindi','हिमाचल प्रदेश', 'शिमला', ExpectedShimlaTehsils);
  });

  it("18. Validate Shimla Tehsil Names in Marathi (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.marathi, 'marathi','हिमाचल प्रदेश', 'शिमला', ExpectedShimlaTehsils);
  });

  it("19. Validate Shimla Tehsil Names in Tamil (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.tamil, 'tamil','ஹிமாச்சல பிரதேசம்', 'சிம்லா', ExpectedShimlaTehsils);
  });

  it("20. Validate Shimla Tehsil Names in Telugu (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.telugu, 'telugu','హిమాచల్ ప్రదేశ్', 'సిమ్లా', ExpectedShimlaTehsils);
  });
});

describe("Implement Pages - Jammu Tehsil Validation", () => {
  it("21. Validate Jammu Tehsil Names in English (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.english, 'english','Jammu And Kashmir', 'Jammu', ExpectedJammuTehsils);
  });

  it("22. Validate Jammu Tehsil Names in Hindi (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.hindi, 'hindi','जम्मू और कश्मीर', 'जम्मू', ExpectedJammuTehsils);
  });

  it("23. Validate Jammu Tehsil Names in Marathi (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.marathi, 'marathi','जम्मू आणि काश्मीर', 'जम्मू', ExpectedJammuTehsils);
  });

  it("24. Validate Jammu Tehsil Names in Tamil (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.tamil, 'tamil','ஜம்மு மற்றும் காஷ்மீர்', 'ஜம்மு', ExpectedJammuTehsils);
  });

  it("25. Validate Jammu Tehsil Names in Telugu (Implement Pages)", () => {
    validateTehsilsMainPageForImplements(ImplementPageUrls.telugu, 'telugu','జమ్మూ మరియు కాశ్మీర్', 'జమ్మూ', ExpectedJammuTehsils);
  });
});

  /*describe("Implement Grid: HP - New Delhi Tehsil Validation", () => {
    it("26. Validate New Delhi Tehsil Names in English (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.english, 'english','Delhi', 'New Delhi', ExpectedNewDelhiTehsils);
    });

    it("27. Validate New Delhi Tehsil Names in Hindi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'दिल्ली','नई दिल्ली', ExpectedNewDelhiTehsils);
    });

    it("28. Validate New Delhi Tehsil Names in Marathi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'दिल्ली','नवी दिल्ली', ExpectedNewDelhiTehsils);
    });

    it("29. Validate New Delhi Tehsil Names in Tamil (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'டெல்லி','புது தில்லி', ExpectedNewDelhiTehsils);
    });

    it("30. Validate New Delhi Tehsil Names in Telugu (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'ఢిల్లీ','న్యూఢిల్లీ', ExpectedNewDelhiTehsils);
    });
  });

  describe("Implement Grid: HP - Ahmedabad Tehsil Validation", () => {
    it("31. Validate Ahmedabad Tehsil Names in English (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.english, 'english','Gujarat', 'Ahmedabad', ExpectedAhmedabadTehsils);
    });

    it("32. Validate Ahmedabad Tehsil Names in Hindi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.hindi, 'hindi','गुजरात', 'अहमदाबाद', ExpectedAhmedabadTehsils);
    });

    it("33. Validate Ahmedabad Tehsil Names in Marathi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'गुजरात', 'अहमदाबाद', ExpectedAhmedabadTehsils);
    });

    it("34. Validate Ahmedabad Tehsil Names in Tamil (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'குஜராத்','அகமதாபாத்', ExpectedAhmedabadTehsils);
    });

    it("35. Validate Ahmedabad Tehsil Names in Telugu (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'గుజరాత్', 'అహ్మదాబాద్', ExpectedAhmedabadTehsils);
    });
  });

describe("Implement Grid: HP - Gurugram Tehsil Validation", () => {
    it("36. Validate Gurugram Tehsil Names in English (Implement Grid: HP)", () => {
        validateTehsilsGridPageForImplements(ImplementGridUrls.english, 'english','Haryana', 'Gurugram', ExpectedGurugramTehsils);
    });

    it("37. Validate Gurugram Tehsil Names in Hindi (Implement Grid: HP)", () => {
        validateTehsilsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'हरियाणा', 'गुरूग्राम', ExpectedGurugramTehsils);
    });

    it("38. Validate Gurugram Tehsil Names in Marathi (Implement Grid: HP)", () => {
        validateTehsilsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'हरियाणा', 'गुरुग्राम', ExpectedGurugramTehsils);
    });

    it("39. Validate Gurugram Tehsil Names in Tamil (Implement Grid: HP)", () => {
        validateTehsilsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'ஹரியானா', 'குருகிராம்', ExpectedGurugramTehsils);
    });

    it("40. Validate Gurugram Tehsil Names in Telugu (Implement Grid: HP)", () => {
        validateTehsilsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'హర్యానా', 'గురుగ్రామ్', ExpectedGurugramTehsils);
    });
});

describe("Implement Grid: HP - Shimla Tehsil Validation", () => {
  it("41. Validate Shimla Tehsil Names in English (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.english, 'english','Himachal Pradesh','Shimla', ExpectedShimlaTehsils);
  });

  it("42. Validate Shimla Tehsil Names in Hindi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.hindi,'hindi', 'हिमाचल प्रदेश', 'शिमला', ExpectedShimlaTehsils);
  });

  it("43. Validate Shimla Tehsil Names in Marathi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.marathi,'marathi', 'हिमाचल प्रदेश', 'शिमला', ExpectedShimlaTehsils);
  });

  it("44. Validate Shimla Tehsil Names in Tamil (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'ஹிமாச்சல பிரதேசம்', 'சிம்லா', ExpectedShimlaTehsils);
  });

  it("45. Validate Shimla Tehsil Names in Telugu (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.telugu, 'telugu','హిమాచల్ ప్రదేశ్', 'సిమ్లా', ExpectedShimlaTehsils);
  });
});

describe("Implement Grid: HP - Jammu And Kashmir Tehsil Validation", () => {
  it("46. Validate Jammu And Kashmir Tehsil Names in English (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.english, 'english','Jammu And Kashmir','Jammu', ExpectedJammuTehsils);
  });

  it("47. Validate Jammu And Kashmir Tehsil Names in Hindi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'जम्मू और कश्मीर','जम्मू', ExpectedJammuTehsils);
  });

  it("48. Validate Jammu And Kashmir Tehsil Names in Marathi (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'जम्मू आणि काश्मीर', 'जम्मू', ExpectedJammuTehsils);
  });

  it("49. Validate Jammu And Kashmir Tehsil Names in Tamil (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.tamil, 'tamil','ஜம்மு மற்றும் காஷ்மீர்', 'ஜம்மு', ExpectedJammuTehsils);
  });

  it("50. Validate Jammu And Kashmir Tehsil Names in Telugu (Implement Grid: HP)", () => {
      validateTehsilsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'జమ్మూ మరియు కాశ్మీర్', 'జమ్మూ', ExpectedJammuTehsils);
  });
});*/

});
