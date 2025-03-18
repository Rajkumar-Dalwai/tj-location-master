/// <reference types="cypress" />

import UttarakhandVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/UttarakhandVsDistrictsRepo.cy";
import DelhiVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/DelhiVsDistrictsRepo.cy";
import GoaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/GoaVsDistrictsRepo.cy";
import HaryanaVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/HaryanaVsDistrictsRepo.cy";
import HimachalPradeshVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/HimachalPradeshVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedUttarakhandDistricts = UttarakhandVsDistrictsRepo.getExpectedUttarakhandDistricts();
  const ExpectedDelhiDistricts = DelhiVsDistrictsRepo.getExpectedDelhiDistricts();
  const ExpectedGoaDistricts = GoaVsDistrictsRepo.getExpectedGoaDistricts();
  const ExpectedHaryanaDistricts = HaryanaVsDistrictsRepo.getExpectedHaryanaDistricts();
  const ExpectedHimachalPradeshDistricts = HimachalPradeshVsDistrictsRepo.getExpectedHimachalPradeshDistricts();

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

  const validateDistrictsMainPageForTractor = (pageUrl, languageKey, stateName, expectedDistrictsForTractor) => {
    cy.visit(pageUrl);
    cy.wait(2000);

    // Click on the first Tractor card
    cy.get('#mahindranew > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate')
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
        .should('have.length', expectedDistrictsForTractor.length);

    let orderMismatches = [];
    let spellingMismatches = [];

    // Iterate over district options to validate order and spelling
    cy.get('#gorp_form_dist_id')
        .find('option')
        .not(':first')
        .each(($option, index) => {
            const actual = $option.text().trim();
            const expected = expectedDistrictsForTractor[index]?.[languageKey]?.trim();

            if (actual !== expected) {
                if (expectedDistrictsForTractor.some(d => d[languageKey] === actual)) {
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
const validateDistrictsGridPageForTractor = (pageUrl, languageKey, stateName, expectedDistrictsForTractor) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  // Click on the second Tractor card
  cy.get('#popularnew > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate').click();
  cy.wait(2000);

  // Select the state from the dropdown
  cy.get('#states').should('be.visible').select(stateName);
  cy.wait(2000);

  // Verify the district options length
  cy.get('#gorp_form_dist_id')
      .find('option')
      .not(':first')
      .should('have.length', expectedDistrictsForTractor.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  // Iterate over district options to validate order and spelling
  cy.get('#gorp_form_dist_id')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedDistrictsForTractor[index]?.[languageKey];

          if (actual !== expected) {
              if (expectedDistrictsForTractor.some(d => d[languageKey] === actual)) {
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
  describe("Tractor Pages - Uttarakhand District Validation", () => {
    it("1. Validate Uttarakhand District Names in English (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.english, 'english', 'Uttarakhand', ExpectedUttarakhandDistricts);
    });

   it("2. Validate Uttarakhand District Names in Hindi (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.hindi, 'hindi', 'उत्तराखंड', ExpectedUttarakhandDistricts);
    });

    it("3. Validate Uttarakhand District Names in Marathi (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.marathi, 'marathi', 'उत्तराखंड', ExpectedUttarakhandDistricts);
    });

    it("4. Validate Uttarakhand District Names in Tamil (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.tamil, 'tamil', 'உத்தரகாண்ட்', ExpectedUttarakhandDistricts);
    });

    it("5. Validate Uttarakhand District Names in Telugu (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.telugu, 'telugu', 'ఉత్తరాఖండ్', ExpectedUttarakhandDistricts);
    });
  });

   describe("Tractor Pages - Delhi District Validation", () => {
    it("6. Validate Delhi District Names in English (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.english, 'english', 'Delhi', ExpectedDelhiDistricts);
    });

    it("7. Validate Delhi District Names in Hindi (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.hindi, 'hindi', 'दिल्ली', ExpectedDelhiDistricts);
    });

    it("8. Validate Delhi District Names in Marathi (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.marathi, 'marathi', 'दिल्ली', ExpectedDelhiDistricts);
    });

    it("9. Validate Delhi District Names in Tamil (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.tamil, 'tamil', 'டெல்லி', ExpectedDelhiDistricts);
    });

    it("10. Validate Delhi District Names in Telugu (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.telugu, 'telugu', 'ఢిల్లీ', ExpectedDelhiDistricts);
    });
  });

 describe("Tractor Pages - Goa District Validation", () => {
    it("11. Validate Goa District Names in English (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.english, 'english', 'Goa', ExpectedGoaDistricts);
    });

    it("12. Validate Goa District Names in Hindi (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.hindi, 'hindi', 'गोवा', ExpectedGoaDistricts);
    });

    it("13. Validate Goa District Names in Marathi (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.marathi, 'marathi', 'गोवा', ExpectedGoaDistricts);
    });

    it("14. Validate Goa District Names in Tamil (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.tamil, 'tamil', 'கோவா', ExpectedGoaDistricts);
    });

    it("15. Validate Goa District Names in Telugu (Tractor Pages)", () => {
      validateDistrictsMainPageForTractor(TractorPageUrls.telugu, 'telugu', 'గోవా', ExpectedGoaDistricts);
    });
});

describe("Tractor Pages - Haryana District Validation", () => {
  it("16. Validate Haryana District Names in English (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.english, 'english', 'Haryana', ExpectedHaryanaDistricts);
  });

  it("17. Validate Haryana District Names in Hindi (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.hindi, 'hindi', 'हरियाणा', ExpectedHaryanaDistricts);
  });

  it("18. Validate Haryana District Names in Marathi (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.marathi, 'marathi', 'हरियाणा', ExpectedHaryanaDistricts);
  });

  it("19. Validate Haryana District Names in Tamil (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.tamil, 'tamil', 'ஹரியானா', ExpectedHaryanaDistricts);
  });

  it("20. Validate Haryana District Names in Telugu (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.telugu, 'telugu', 'హర్యానా', ExpectedHaryanaDistricts);
  });
});

describe("Tractor Pages - HimachalPradesh District Validation", () => {
  it("21. Validate HimachalPradesh District Names in English (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.english, 'english', 'Himachal Pradesh', ExpectedHimachalPradeshDistricts);
  });

  it("22. Validate HimachalPradesh District Names in Hindi (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.hindi, 'hindi', 'हिमाचल प्रदेश', ExpectedHimachalPradeshDistricts);
  });

  it("23. Validate HimachalPradesh District Names in Marathi (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.marathi, 'marathi', 'हिमाचल प्रदेश', ExpectedHimachalPradeshDistricts);
  });

  it("24. Validate HimachalPradesh District Names in Tamil (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.tamil, 'tamil', 'ஹிமாச்சல பிரதேசம்', ExpectedHimachalPradeshDistricts);
  });

  it("25. Validate HimachalPradesh District Names in Telugu (Tractor Pages)", () => {
    validateDistrictsMainPageForTractor(TractorPageUrls.telugu, 'telugu', 'హిమాచల్ ప్రదేశ్', ExpectedHimachalPradeshDistricts);
  });
});

 describe("Tractor Grid: HP - Uttarakhand District Validation", () => {
    it("26. Validate Uttarakhand District Names in English (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.english, 'english', 'Uttarakhand', ExpectedUttarakhandDistricts);
    });

    it("27. Validate Uttarakhand District Names in Hindi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'उत्तराखंड', ExpectedUttarakhandDistricts);
    });

    it("28. Validate Uttarakhand District Names in Marathi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'उत्तराखंड', ExpectedUttarakhandDistricts);
    });

    it("29. Validate Uttarakhand District Names in Tamil (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'உத்தரகாண்ட்', ExpectedUttarakhandDistricts);
    });

    it("30. Validate Uttarakhand District Names in Telugu (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'ఉత్తరాఖండ్', ExpectedUttarakhandDistricts);
    });
  });

  describe("Tractor Grid: HP - Delhi District Validation", () => {
    it("31. Validate Delhi District Names in English (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.english, 'english', 'Delhi', ExpectedDelhiDistricts);
    });

    it("32. Validate Delhi District Names in Hindi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'दिल्ली', ExpectedDelhiDistricts);
    });

    it("33. Validate Delhi District Names in Marathi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'दिल्ली', ExpectedDelhiDistricts);
    });

    it("34. Validate Delhi District Names in Tamil (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'டெல்லி', ExpectedDelhiDistricts);
    });

    it("35. Validate Delhi District Names in Telugu (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'ఢిల్లీ', ExpectedDelhiDistricts);
    });
  });

describe("Tractor Grid: HP - Goa District Validation", () => {
    it("36. Validate Goa District Names in English (Tractor Grid)", () => {
        validateDistrictsGridPageForTractor(TractorGridUrls.english, 'english', 'Goa', ExpectedGoaDistricts);
    });

    it("37. Validate Goa District Names in Hindi (Tractor Grid)", () => {
        validateDistrictsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'गोवा', ExpectedGoaDistricts);
    });

    it("38. Validate Goa District Names in Marathi (Tractor Grid)", () => {
        validateDistrictsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'गोवा', ExpectedGoaDistricts);
    });

    it("39. Validate Goa District Names in Tamil (Tractor Grid)", () => {
        validateDistrictsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'கோவா', ExpectedGoaDistricts);
    });

    it("40. Validate Goa District Names in Telugu (Tractor Grid)", () => {
        validateDistrictsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'గోవా', ExpectedGoaDistricts);
    });
});

describe("Tractor Grid: HP - Haryana District Validation", () => {
  it("41. Validate Haryana District Names in English (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.english, 'english', 'Haryana', ExpectedHaryanaDistricts);
  });

  it("42. Validate Haryana District Names in Hindi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'हरियाणा', ExpectedHaryanaDistricts);
  });

  it("43. Validate Haryana District Names in Marathi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'हरियाणा', ExpectedHaryanaDistricts);
  });

  it("44. Validate Haryana District Names in Tamil (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'ஹரியானா', ExpectedHaryanaDistricts);
  });

  it("45. Validate Haryana District Names in Telugu (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'హర్యానా', ExpectedHaryanaDistricts);
  });
});

describe("Tractor Grid: HP - HimachalPradesh District Validation", () => {
  it("46. Validate HimachalPradesh District Names in English (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.english, 'english', 'Himachal Pradesh', ExpectedHimachalPradeshDistricts);
  });

  it("47. Validate HimachalPradesh District Names in Hindi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.hindi, 'hindi', 'हिमाचल प्रदेश', ExpectedHimachalPradeshDistricts);
  });

  it("48. Validate HimachalPradesh District Names in Marathi (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.marathi, 'marathi', 'हिमाचल प्रदेश', ExpectedHimachalPradeshDistricts);
  });

  it("49. Validate HimachalPradesh District Names in Tamil (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.tamil, 'tamil', 'ஹிமாச்சல பிரதேசம்', ExpectedHimachalPradeshDistricts);
  });

  it("50. Validate HimachalPradesh District Names in Telugu (Tractor Grid)", () => {
      validateDistrictsGridPageForTractor(TractorGridUrls.telugu, 'telugu', 'హిమాచల్ ప్రదేశ్', ExpectedHimachalPradeshDistricts);
  });
});

});
