/// <reference types="cypress" />

import PunjabVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/PunjabVsDistrictsRepo.cy";
import SikkimVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/SikkimVsDistrictsRepo.cy";
import TamilNaduVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/TamilNaduVsDistrictsRepo.cy";
import TheDadraAndNagarHaveliAndDamanAndDiuVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/TheDadraAndNagarHaveliAndDamanAndDiuVsDistrictsRepo.jy";
import TripuraVsDistrictsRepo from "../../Reusable-Utilities/DistrictRepo/TripuraVsDistrictsRepo.cy";

describe("Multilingual District Validation", () => {
  // Constants
  const ExpectedPunjabDistricts = PunjabVsDistrictsRepo.getExpectedPunjabDistricts();
  const ExpectedSikkimDistricts = SikkimVsDistrictsRepo.getExpectedSikkimDistricts();
  const ExpectedTamilNaduDistricts = TamilNaduVsDistrictsRepo.getExpectedTamilNaduDistricts();
  const ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts = TheDadraAndNagarHaveliAndDamanAndDiuVsDistrictsRepo.getExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts();
  const ExpectedTripuraDistricts = TripuraVsDistrictsRepo.getExpectedTripuraDistricts();

// Used Pages
const UsedPageUrls = {
  english: `${Cypress.env('url')}buy-used-tractor/`,
  hindi: `${Cypress.env('url')}hi/buy-used-tractor/`,
  marathi: `${Cypress.env('url')}mr/buy-used-tractor/`,
  tamil: `${Cypress.env('url')}ta/buy-used-tractor/`,
  telugu: `${Cypress.env('url')}te/buy-used-tractor/`,
};

// Used Farm Implement Pages
const UsedFarmImplementUrls = {
  english: `${Cypress.env('url')}used-implement/mahindra/2022/5914/`,
  hindi: `${Cypress.env('url')}hi/used-implement/mahindra/2022/5914/`,
  marathi: `${Cypress.env('url')}mr/used-implement/mahindra/2022/5914/`,
  tamil: `${Cypress.env('url')}ta/used-implement/mahindra/2022/5914/`,
  telugu: `${Cypress.env('url')}te/used-implement/mahindra/2022/5914/`,
};

  const validateDistrictsMainPageForUsed = (pageUrl, languageKey, stateName, expectedDistrictsForUsed) => {
    cy.visit(pageUrl);
    cy.wait(2000);

    // Select the state from the dropdown
    cy.get('#state_id').should('be.visible').select(stateName);
    cy.wait(2000);

    // Verify the district options length
    cy.get('#dist_id')
        .find('option')
        .not(':first')
        .should('have.length', expectedDistrictsForUsed.length);

    let orderMismatches = [];
    let spellingMismatches = [];

    // Iterate over district options to validate order and spelling
    cy.get('#dist_id')
        .find('option')
        .not(':first')
        .each(($option, index) => {
            const actual = $option.text().trim();
            const expected = expectedDistrictsForUsed[index]?.[languageKey]?.trim();

            if (actual !== expected) {
                if (expectedDistrictsForUsed.some(d => d[languageKey] === actual)) {
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
const validateDistrictsOtherPageForUsed = (pageUrl, languageKey, stateName, expectedDistrictsForUsed) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  // Select the state from the dropdown
  cy.get('#inputState').should('be.visible').select(stateName);
  cy.wait(2000);

  // Verify the district options length
  cy.get('#inputdistric')
      .find('option')
      .not(':first')
      .should('have.length', expectedDistrictsForUsed.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  // Iterate over district options to validate order and spelling
  cy.get('#inputdistric')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedDistrictsForUsed[index]?.[languageKey];

          if (actual !== expected) {
              if (expectedDistrictsForUsed.some(d => d[languageKey] === actual)) {
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
  describe("Used Pages - Punjab District Validation", () => {
    it("1. Validate Punjab District Names in English (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.english, 'english', 'Punjab', ExpectedPunjabDistricts);
    });

   it("2. Validate Punjab District Names in Hindi (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.hindi, 'hindi', 'पंजाब', ExpectedPunjabDistricts);
    });

    it("3. Validate Punjab District Names in Marathi (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.marathi, 'marathi', 'पंजाब', ExpectedPunjabDistricts);
    });

    it("4. Validate Punjab District Names in Tamil (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.tamil, 'tamil', 'பஞ்சாப்', ExpectedPunjabDistricts);
    });

    it("5. Validate Punjab District Names in Telugu (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.telugu, 'telugu', 'పంజాబ్', ExpectedPunjabDistricts);
    });
  });

   describe("Used Pages - Sikkim District Validation", () => {
    it("6. Validate Sikkim District Names in English (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.english, 'english', 'Sikkim', ExpectedSikkimDistricts);
    });

    it("7. Validate Sikkim District Names in Hindi (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.hindi, 'hindi', 'सिक्किम', ExpectedSikkimDistricts);
    });

    it("8. Validate Sikkim District Names in Marathi (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.marathi, 'marathi', 'सिक्कीम', ExpectedSikkimDistricts);
    });

    it("9. Validate Sikkim District Names in Tamil (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.tamil, 'tamil', 'சிக்கிம்', ExpectedSikkimDistricts);
    });

    it("10. Validate Sikkim District Names in Telugu (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.telugu, 'telugu', 'సిక్కిం', ExpectedSikkimDistricts);
    });
  });

 describe("Used Pages - Tamil Nadu District Validation", () => {
    it("11. Validate Tamil Nadu District Names in English (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.english, 'english', 'Tamil Nadu', ExpectedTamilNaduDistricts);
    });

    it("12. Validate Tamil Nadu District Names in Hindi (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.hindi, 'hindi', 'तमिलनाडु', ExpectedTamilNaduDistricts);
    });

    it("13. Validate Tamil Nadu District Names in Marathi (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.marathi, 'marathi', 'तामिळनाडू', ExpectedTamilNaduDistricts);
    });

    it("14. Validate Tamil Nadu District Names in Tamil (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.tamil, 'tamil', 'தமிழ்நாடு', ExpectedTamilNaduDistricts);
    });

    it("15. Validate Tamil Nadu District Names in Telugu (Used Pages)", () => {
      validateDistrictsMainPageForUsed(UsedPageUrls.telugu, 'telugu', 'తమిళనాడు', ExpectedTamilNaduDistricts);
    });
});

describe("Used Pages - The Dadra And Nagar Haveli And Daman And Diu District Validation", () => {
  it("16. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in English (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.english, 'english', 'The Dadra And Nagar Haveli And Daman And Diu', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("17. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Hindi (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.hindi, 'hindi', 'दादरा और नगर हवेली और दमन और दीव', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("18. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Marathi (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.marathi, 'marathi', 'दादरा आणि नगर हवेली आणि दमण आणि दीव', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("19. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Tamil (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.tamil, 'tamil', 'தாத்ரா மற்றும் நகர் ஹவேலி மற்றும் டாமன் மற்றும் டையூ', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("20. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Telugu (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.telugu, 'telugu', 'దాద్రా మరియు నగర్ హవేలీ మరియు డామన్ మరియు డయ్యూ', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });
});

describe("Used Pages - Tripura District Validation", () => {
  it("21. Validate Tripura District Names in English (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.english, 'english', 'Tripura', ExpectedTripuraDistricts);
  });

  it("22. Validate Tripura District Names in Hindi (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.hindi, 'hindi', 'त्रिपुरा', ExpectedTripuraDistricts);
  });

  it("23. Validate Tripura District Names in Marathi (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.marathi, 'marathi', 'त्रिपुरा', ExpectedTripuraDistricts);
  });

  it("24. Validate Tripura District Names in Tamil (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.tamil, 'tamil', 'திரிபுரா', ExpectedTripuraDistricts);
  });

  it("25. Validate Tripura District Names in Telugu (Used Pages)", () => {
    validateDistrictsMainPageForUsed(UsedPageUrls.telugu, 'telugu', 'త్రిపుర', ExpectedTripuraDistricts);
  });
});

 describe("Used Farm Implement Pages - Punjab District Validation", () => {
    it("26. Validate Punjab District Names in English (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.english, 'english', 'Punjab', ExpectedPunjabDistricts);
    });

    it("27. Validate Punjab District Names in Hindi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.hindi, 'hindi', 'पंजाब', ExpectedPunjabDistricts);
    });

    it("28. Validate Punjab District Names in Marathi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.marathi, 'marathi', 'पंजाब', ExpectedPunjabDistricts);
    });

    it("29. Validate Punjab District Names in Tamil (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.tamil, 'tamil', 'பஞ்சாப்', ExpectedPunjabDistricts);
    });

    it("30. Validate Punjab District Names in Telugu (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.telugu, 'telugu', 'పంజాబ్', ExpectedPunjabDistricts);
    });
  });

  describe("Used Farm Implement Pages - Sikkim District Validation", () => {
    it("31. Validate Sikkim District Names in English (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.english, 'english', 'Sikkim', ExpectedSikkimDistricts);
    });

    it("32. Validate Sikkim District Names in Hindi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.hindi, 'hindi', 'सिक्किम', ExpectedSikkimDistricts);
    });

    it("33. Validate Sikkim District Names in Marathi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.marathi, 'marathi', 'सिक्कीम', ExpectedSikkimDistricts);
    });

    it("34. Validate Sikkim District Names in Tamil (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.tamil, 'tamil', 'சிக்கிம்', ExpectedSikkimDistricts);
    });

    it("35. Validate Sikkim District Names in Telugu (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.telugu, 'telugu', 'సిక్కిం', ExpectedSikkimDistricts);
    });
  });

describe("Used Farm Implement Pages - Tamil Nadu District Validation", () => {
    it("36. Validate Tamil Nadu District Names in English (Used Farm Implement Pages)", () => {
        validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.english, 'english', 'Tamil Nadu', ExpectedTamilNaduDistricts);
    });

    it("37. Validate Tamil Nadu District Names in Hindi (Used Farm Implement Pages)", () => {
        validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.hindi, 'hindi', 'तमिलनाडु', ExpectedTamilNaduDistricts);
    });

    it("38. Validate Tamil Nadu District Names in Marathi (Used Farm Implement Pages)", () => {
        validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.marathi, 'marathi', 'तामिळनाडू', ExpectedTamilNaduDistricts);
    });

    it("39. Validate Tamil Nadu District Names in Tamil (Used Farm Implement Pages)", () => {
        validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.tamil, 'tamil', 'தமிழ்நாடு', ExpectedTamilNaduDistricts);
    });

    it("40. Validate Tamil Nadu District Names in Telugu (Used Farm Implement Pages)", () => {
        validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.telugu, 'telugu', 'తమిళనాడు', ExpectedTamilNaduDistricts);
    });
});

describe("Used Farm Implement Pages - The Dadra And Nagar Haveli And Daman And Diu District Validation", () => {
  it("41. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in English (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.english, 'english', 'The Dadra And Nagar Haveli And Daman And Diu', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("42. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Hindi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.hindi, 'hindi', 'दादरा और नगर हवेली और दमन और दीव', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("43. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Marathi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.marathi, 'marathi', 'दादरा आणि नगर हवेली आणि दमण आणि दीव', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("44. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Tamil (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.tamil, 'tamil', 'தாத்ரா மற்றும் நகர் ஹவேலி மற்றும் டாமன் மற்றும் டையூ', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });

  it("45. Validate The Dadra And Nagar Haveli And Daman And Diu District Names in Telugu (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.telugu, 'telugu', 'దాద్రా మరియు నగర్ హవేలీ మరియు డామన్ మరియు డయ్యూ', ExpectedTheDadraAndNagarHaveliAndDamanAndDiuDistricts);
  });
});

describe("Used Farm Implement Pages - Tripura District Validation", () => {
  it("46. Validate Tripura District Names in English (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.english, 'english', 'Tripura', ExpectedTripuraDistricts);
  });

  it("47. Validate Tripura District Names in Hindi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.hindi, 'hindi', 'त्रिपुरा', ExpectedTripuraDistricts);
  });

  it("48. Validate Tripura District Names in Marathi (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.marathi, 'marathi', 'त्रिपुरा', ExpectedTripuraDistricts);
  });

  it("49. Validate Tripura District Names in Tamil (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.tamil, 'tamil', 'திரிபுரா', ExpectedTripuraDistricts);
  });

  it("50. Validate Tripura District Names in Telugu (Used Farm Implement Pages)", () => {
      validateDistrictsOtherPageForUsed(UsedFarmImplementUrls.telugu, 'telugu', 'త్రిపుర', ExpectedTripuraDistricts);
  });
});

});
