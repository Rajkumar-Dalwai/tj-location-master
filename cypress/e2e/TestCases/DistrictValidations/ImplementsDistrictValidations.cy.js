/// <reference types="cypress" />

import JammuAndKashmirVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/JammuAndKashmirVsDistrictsRepo.cy";
import JharkhandVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/JharkhandVsDistrictsRepo.cy";
import LadakhVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/LadakhVsDistrictsRepo.cy";
import LakshadweepVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/LakshadweepVsDistrictsRepo.cy";
import MadhyaPradeshVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/MadhyaPradeshVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedJammuAndKashmirDistricts = JammuAndKashmirVsDistrictsRepo.getExpectedJammuAndKashmirDistricts();
  const ExpectedJharkhandDistricts = JharkhandVsDistrictsRepo.getExpectedJharkhandDistricts();
  const ExpectedLadakhDistricts = LadakhVsDistrictsRepo.getExpectedLadakhDistricts();
  const ExpectedLakshadweepDistricts = LakshadweepVsDistrictsRepo.getExpectedLakshadweepDistricts();
  const ExpectedMadhyaPradeshDistricts = MadhyaPradeshVsDistrictsRepo.getExpectedMadhyaPradeshDistricts();

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

  const validateDistrictsMainPageForImplements = (pageUrl, languageKey, stateName, expectedDistrictsForImplements) => {
    cy.visit(pageUrl);
    cy.wait(2000);

    // Click on the first implement card
    cy.get(':nth-child(3) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor')
        .first()
        .click();
    cy.wait(2000);

    // Select the state from the dropdown
    cy.get('#states').should('be.visible').select(stateName);
    cy.wait(2000);

    // Verify the district options length
    cy.get('#gorp_form_dist_id')
        .find('option')
        .not(':first')
        .should('have.length', expectedDistrictsForImplements.length);

    let orderMismatches = [];
    let spellingMismatches = [];

    // Iterate over district options to validate order and spelling
    cy.get('#gorp_form_dist_id')
        .find('option')
        .not(':first')
        .each(($option, index) => {
            const actual = $option.text().trim();
            const expected = expectedDistrictsForImplements[index]?.[languageKey]?.trim();

            if (actual !== expected) {
                if (expectedDistrictsForImplements.some(d => d[languageKey] === actual)) {
                    orderMismatches.push({ index, actual, expected });
                } else {
                    spellingMismatches.push({ index, actual, expected });
                }
            }
        })
        .then(() => {
            // Log order mismatches with detailed information
            if (orderMismatches.length) {
                cy.log('❌ Order Mismatched Districts:');
                orderMismatches.forEach(mismatch => {
                    const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                    cy.log(logMessage); // Cypress log
                    console.error(logMessage); // Terminal log
                });
            } else {
                cy.log('✅ No order mismatches found.');
            }

            // Log spelling mismatches with detailed information
            if (spellingMismatches.length) {
                cy.log('❌ Spelling Mismatched Districts:');
                spellingMismatches.forEach(mismatch => {
                    const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                    cy.log(logMessage); // Cypress log
                    console.error(logMessage); // Terminal log
                });

                // Throwing a detailed error to make the failure clear
                throw new Error(
                    `District validation failed due to spelling mismatches.\n` +
                    spellingMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
                );
            } else {
                cy.log(`✅ All districts are matched accurately in ${languageKey}!`);
            }
        });
};

// Reusable function for Grid Page
const validateDistrictsGridPageForImplements = (pageUrl, languageKey, stateName, expectedDistrictsForImplements) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  // Click on the second implement card
  cy.get(':nth-child(2) > .new-equipment-card-main > .new-equipment-card-anchor > .new-equipment-anchor').click();
  cy.wait(2000);

  // Select the state from the dropdown
  cy.get('#states').should('be.visible').select(stateName);
  cy.wait(2000);

  // Verify the district options length
  cy.get('#gorp_form_dist_id')
      .find('option')
      .not(':first')
      .should('have.length', expectedDistrictsForImplements.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  // Iterate over district options to validate order and spelling
  cy.get('#gorp_form_dist_id')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedDistrictsForImplements[index]?.[languageKey];

          if (actual !== expected) {
              if (expectedDistrictsForImplements.some(d => d[languageKey] === actual)) {
                  orderMismatches.push({ index, actual, expected });
              } else {
                  spellingMismatches.push({ index, actual, expected });
              }
          }
      })
      .then(() => {
          // Log order mismatches with detailed information
          if (orderMismatches.length) {
              cy.log('❌ Order Mismatched Districts:');
              orderMismatches.forEach(mismatch => {
                  const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                  cy.log(logMessage);
                  console.error(logMessage);
              });
          } else {
              cy.log('✅ No order mismatches found.');
          }

          // Handle spelling mismatches with error logging
          if (spellingMismatches.length) {
              cy.log('❌ Spelling Mismatched Districts:');
              spellingMismatches.forEach(mismatch => {
                  const logMessage = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
                  cy.log(logMessage);
                  console.error(logMessage);
              });
              throw new Error(
                  `District validation failed due to spelling mismatches.\n` +
                  spellingMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
              );
          } else {
              cy.log(`✅ All districts are matched accurately in ${languageKey}!`);
          }
      });
};


  // Test cases
  /*describe("Implement Pages - Jammu And Kashmir District Validation", () => {
    it("1. Validate Jammu And Kashmir District Names in English (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.english, 'english', 'Jammu And Kashmir', ExpectedJammuAndKashmirDistricts);
    });

   it("2. Validate Jammu And Kashmir District Names in Hindi (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.hindi, 'hindi', 'जम्मू और कश्मीर', ExpectedJammuAndKashmirDistricts);
    });

    it("3. Validate Jammu And Kashmir District Names in Marathi (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.marathi, 'marathi', 'जम्मू आणि काश्मीर', ExpectedJammuAndKashmirDistricts);
    });

    it("4. Validate Jammu And Kashmir District Names in Tamil (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.tamil, 'tamil', 'ஜம்மு மற்றும் காஷ்மீர்', ExpectedJammuAndKashmirDistricts);
    });

    it("5. Validate Jammu And Kashmir District Names in Telugu (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.telugu, 'telugu', 'జమ్మూ మరియు కాశ్మీర్', ExpectedJammuAndKashmirDistricts);
    });
  });

   describe("Implement Pages - Jharkhand District Validation", () => {
    it("6. Validate Jharkhand District Names in English (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.english, 'english', 'Jharkhand', ExpectedJharkhandDistricts);
    });

    it("7. Validate Jharkhand District Names in Hindi (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.hindi, 'hindi', 'झारखंड', ExpectedJharkhandDistricts);
    });

    it("8. Validate Jharkhand District Names in Marathi (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.marathi, 'marathi', 'झारखंड', ExpectedJharkhandDistricts);
    });

    it("9. Validate Jharkhand District Names in Tamil (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.tamil, 'tamil', 'ஜார்கண்ட்', ExpectedJharkhandDistricts);
    });

    it("10. Validate Jharkhand District Names in Telugu (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.telugu, 'telugu', 'జార్ఖండ్', ExpectedJharkhandDistricts);
    });
  });

 describe("Implement Pages - Ladakh District Validation", () => {
    it("11. Validate Ladakh District Names in English (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.english, 'english', 'Ladakh', ExpectedLadakhDistricts);
    });

    it("12. Validate Ladakh District Names in Hindi (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.hindi, 'hindi', 'लद्दाख', ExpectedLadakhDistricts);
    });

    it("13. Validate Ladakh District Names in Marathi (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.marathi, 'marathi', 'लडाख', ExpectedLadakhDistricts);
    });

    it("14. Validate Ladakh District Names in Tamil (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.tamil, 'tamil', 'லடாக்', ExpectedLadakhDistricts);
    });

    it("15. Validate Ladakh District Names in Telugu (Implement Pages)", () => {
      validateDistrictsMainPageForImplements(ImplementPageUrls.telugu, 'telugu', 'లడఖ్', ExpectedLadakhDistricts);
    });
});

describe("Implement Pages - Lakshadweep District Validation", () => {
  it("16. Validate Lakshadweep District Names in English (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.english, 'english', 'Lakshadweep', ExpectedLakshadweepDistricts);
  });

  it("17. Validate Lakshadweep District Names in Hindi (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.hindi, 'hindi', 'लक्षद्वीप', ExpectedLakshadweepDistricts);
  });

  it("18. Validate Lakshadweep District Names in Marathi (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.marathi, 'marathi', 'लक्षद्वीप', ExpectedLakshadweepDistricts);
  });

  it("19. Validate Lakshadweep District Names in Tamil (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.tamil, 'tamil', 'லட்சத்தீவு', ExpectedLakshadweepDistricts);
  });

  it("20. Validate Lakshadweep District Names in Telugu (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.telugu, 'telugu', 'లక్షద్వీప్', ExpectedLakshadweepDistricts);
  });
});

describe("Implement Pages - MadhyaPradesh District Validation", () => {
  it("21. Validate MadhyaPradesh District Names in English (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.english, 'english', 'Madhya Pradesh', ExpectedMadhyaPradeshDistricts);
  });

  it("22. Validate MadhyaPradesh District Names in Hindi (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.hindi, 'hindi', 'मध्य प्रदेश', ExpectedMadhyaPradeshDistricts);
  });

  it("23. Validate MadhyaPradesh District Names in Marathi (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.marathi, 'marathi', 'मध्य प्रदेश', ExpectedMadhyaPradeshDistricts);
  });

  it("24. Validate MadhyaPradesh District Names in Tamil (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.tamil, 'tamil', 'மத்திய பிரதேசம்', ExpectedMadhyaPradeshDistricts);
  });

  it("25. Validate MadhyaPradesh District Names in Telugu (Implement Pages)", () => {
    validateDistrictsMainPageForImplements(ImplementPageUrls.telugu, 'telugu', 'మధ్యప్రదేశ్', ExpectedMadhyaPradeshDistricts);
  });
});*/

 describe("Implement Grid: HP - Jammu And Kashmir District Validation", () => {
    it("26. Validate Jammu And Kashmir District Names in English (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.english, 'english', 'Jammu And Kashmir', ExpectedJammuAndKashmirDistricts);
    });

    it("27. Validate Jammu And Kashmir District Names in Hindi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'जम्मू और कश्मीर', ExpectedJammuAndKashmirDistricts);
    });

    it("28. Validate Jammu And Kashmir District Names in Marathi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'जम्मू आणि काश्मीर', ExpectedJammuAndKashmirDistricts);
    });

    it("29. Validate Jammu And Kashmir District Names in Tamil (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'ஜம்மு மற்றும் காஷ்மீர்', ExpectedJammuAndKashmirDistricts);
    });

    it("30. Validate Jammu And Kashmir District Names in Telugu (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'జమ్మూ మరియు కాశ్మీర్', ExpectedJammuAndKashmirDistricts);
    });
  });

  describe("Implement Grid: HP - Jharkhand District Validation", () => {
    it("31. Validate Jharkhand District Names in English (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.english, 'english', 'Jharkhand', ExpectedJharkhandDistricts);
    });

    it("32. Validate Jharkhand District Names in Hindi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'झारखंड', ExpectedJharkhandDistricts);
    });

    it("33. Validate Jharkhand District Names in Marathi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'झारखंड', ExpectedJharkhandDistricts);
    });

    it("34. Validate Jharkhand District Names in Tamil (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'ஜார்கண்ட்', ExpectedJharkhandDistricts);
    });

    it("35. Validate Jharkhand District Names in Telugu (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'జార్ఖండ్', ExpectedJharkhandDistricts);
    });
  });

describe("Implement Grid: HP - Ladakh District Validation", () => {
    it("36. Validate Ladakh District Names in English (Implement Grid)", () => {
        validateDistrictsGridPageForImplements(ImplementGridUrls.english, 'english', 'Ladakh', ExpectedLadakhDistricts);
    });

    it("37. Validate Ladakh District Names in Hindi (Implement Grid)", () => {
        validateDistrictsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'लद्दाख', ExpectedLadakhDistricts);
    });

    it("38. Validate Ladakh District Names in Marathi (Implement Grid)", () => {
        validateDistrictsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'लडाख', ExpectedLadakhDistricts);
    });

    it("39. Validate Ladakh District Names in Tamil (Implement Grid)", () => {
        validateDistrictsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'லடாக்', ExpectedLadakhDistricts);
    });

    it("40. Validate Ladakh District Names in Telugu (Implement Grid)", () => {
        validateDistrictsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'లడఖ్', ExpectedLadakhDistricts);
    });
});

describe("Implement Grid: HP - Lakshadweep District Validation", () => {
  it("41. Validate Lakshadweep District Names in English (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.english, 'english', 'Lakshadweep', ExpectedLakshadweepDistricts);
  });

  it("42. Validate Lakshadweep District Names in Hindi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'लक्षद्वीप', ExpectedLakshadweepDistricts);
  });

  it("43. Validate Lakshadweep District Names in Marathi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'लक्षद्वीप', ExpectedLakshadweepDistricts);
  });

  it("44. Validate Lakshadweep District Names in Tamil (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'லட்சத்தீவு', ExpectedLakshadweepDistricts);
  });

  it("45. Validate Lakshadweep District Names in Telugu (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'లక్షద్వీప్', ExpectedLakshadweepDistricts);
  });
});

describe("Implement Grid: HP - MadhyaPradesh District Validation", () => {
  it("46. Validate MadhyaPradesh District Names in English (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.english, 'english', 'MadhyaPradesh', ExpectedMadhyaPradeshDistricts);
  });

  it("47. Validate MadhyaPradesh District Names in Hindi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.hindi, 'hindi', 'मध्य प्रदेश', ExpectedMadhyaPradeshDistricts);
  });

  it("48. Validate MadhyaPradesh District Names in Marathi (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.marathi, 'marathi', 'मध्य प्रदेश', ExpectedMadhyaPradeshDistricts);
  });

  it("49. Validate MadhyaPradesh District Names in Tamil (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.tamil, 'tamil', 'மத்திய பிரதேசம்', ExpectedMadhyaPradeshDistricts);
  });

  it("50. Validate MadhyaPradesh District Names in Telugu (Implement Grid)", () => {
      validateDistrictsGridPageForImplements(ImplementGridUrls.telugu, 'telugu', 'మధ్యప్రదేశ్', ExpectedMadhyaPradeshDistricts);
  });
});

});
