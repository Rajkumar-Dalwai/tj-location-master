/// <reference types="cypress" />

import MohaliVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/MohaliVsTehsilsRepo.cy";
import BilaspurVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/BilaspurVsTehsilsRepo.cy";
import MangaloreVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/MangaloreVsTehsilsRepo.cy";
import OotyVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/OotyVsTehsilsRepo.cy";
import NoidaVsTehsilsRepo from "../../Reusable-Utilities/TehsilRepo/NoidaVsTehsilsRepo.cy";

describe("Multilingual Tehsil Validation", () => {
  // Constants
  const ExpectedMohaliTehsils = MohaliVsTehsilsRepo.getExpectedMohaliTehsils();
  const ExpectedBilaspurTehsils = BilaspurVsTehsilsRepo.getExpectedBilaspurTehsils();
  const ExpectedMangaloreTehsils = MangaloreVsTehsilsRepo.getExpectedMangaloreTehsils();
  const ExpectedOotyTehsils = OotyVsTehsilsRepo.getExpectedOotyTehsils();
  const ExpectedNoidaTehsils = NoidaVsTehsilsRepo.getExpectedNoidaTehsils();

// Used Pages
const UsedPageUrls = {
  english: `${Cypress.env('url')}buy-used-tractor/`,
  hindi: `${Cypress.env('url')}hi/buy-used-tractor/`,
  marathi: `${Cypress.env('url')}mr/buy-used-tractor/`,
  tamil: `${Cypress.env('url')}ta/buy-used-tractor/`,
  telugu: `${Cypress.env('url')}te/buy-used-tractor/`,
};

 // Reusable function for Main Page

const validateTehsilsMainPageForUsed = (pageUrl, languageKey, stateName, districtName, expectedTehsilsForUsed) => {
  cy.visit(pageUrl);
  cy.wait(2000);

  // Select state and district from dropdowns
  cy.get('#state_id').should('be.visible').select(stateName);
  cy.wait(2000);
  cy.get('#dist_id').should('be.visible').select(districtName);
  cy.wait(2000);

  cy.intercept('GET', '/ajax/get-Tehsils/*').as('loadTehsils');

  // Validate the length of dropdown options excluding the first option
  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .should('have.length', expectedTehsilsForUsed.length);

  let orderMismatches = [];
  let spellingMismatches = [];

  cy.get(':nth-child(6) > .custom-select')
      .find('option')
      .not(':first')
      .each(($option, index) => {
          const actual = $option.text().trim();
          const expected = expectedTehsilsForUsed[index]?.[languageKey]?.trim();

          if (actual !== expected) {
              if (expectedTehsilsForUsed.some(t => t[languageKey] === actual)) {
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

  describe("Used Pages - Mohali Tehsil Validation", () => {
    it("1. Validate Mohali Tehsil Names in English (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.english, 'english','Punjab', 'Mohali', ExpectedMohaliTehsils);
    });

    it("2. Validate Mohali Tehsil Names in Hindi (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.hindi, 'hindi', 'पंजाब','मोहाली', ExpectedMohaliTehsils);
    });

    it("3. Validate Mohali Tehsil Names in Marathi (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.marathi, 'marathi', 'पंजाब','मोहाली', ExpectedMohaliTehsils);
    });

    it("4. Validate Mohali Tehsil Names in Tamil (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.tamil, 'tamil', 'பஞ்சாப்', 'மொஹாலி', ExpectedMohaliTehsils);
    });

    it("5. Validate Mohali Tehsil Names in Telugu (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.telugu, 'telugu', 'పంజాబ్', 'మొహాలి', ExpectedMohaliTehsils);
    }); 
  });

 describe("Used Pages - Bilaspur Tehsil Validation", () => {
    it("6. Validate Bilaspur Tehsil Names in English (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.english, 'english','Chhattisgarh', 'Bilaspur', ExpectedBilaspurTehsils);
    });

    it("7. Validate Bilaspur Tehsil Names in Hindi (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.hindi, 'hindi','छत्तीसगढ', 'बिलासपुर', ExpectedBilaspurTehsils);
    });

    it("8. Validate Bilaspur Tehsil Names in Marathi (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.marathi, 'marathi','छत्तीसगड', 'बिलासपूर', ExpectedBilaspurTehsils);
    });

    it("9. Validate Bilaspur Tehsil Names in Tamil (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.tamil, 'tamil','சத்தீஸ்கர்','பிலாஸ்பூர்', ExpectedBilaspurTehsils);
    });

    it("10. Validate Bilaspur Tehsil Names in Telugu (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.telugu, 'telugu','ఛత్తీస్‌గఢ్', 'బిలాస్పూర్', ExpectedBilaspurTehsils);
    });
  });

 describe("Used Pages - Mangalore Tehsil Validation", () => {
    it("11. Validate Mangalore Tehsil Names in English (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.english, 'english','Karnataka', 'Mangalore', ExpectedMangaloreTehsils);
    });

    it("12. Validate Mangalore Tehsil Names in Hindi (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.hindi, 'hindi','कर्नाटक', 'मंगलौर', ExpectedMangaloreTehsils);
    });

    it("13. Validate Mangalore Tehsil Names in Marathi (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.marathi, 'marathi','कर्नाटक', 'मंगलोर', ExpectedMangaloreTehsils);
    });

    it("14. Validate Mangalore Tehsil Names in Tamil (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.tamil, 'tamil','கர்நாடகா', 'மங்களூர்', ExpectedMangaloreTehsils);
    });

    it("15. Validate Mangalore Tehsil Names in Telugu (Used Pages)", () => {
      validateTehsilsMainPageForUsed(UsedPageUrls.telugu, 'telugu','కర్ణాటక', 'మంగళూరు', ExpectedMangaloreTehsils);
    });
});

describe("Used Pages - Ooty Tehsil Validation", () => {
 it("16. Validate Ooty Tehsil Names in English (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.english, 'english','Tamil Nadu', 'Ooty', ExpectedOotyTehsils);
  });

  it("17. Validate Ooty Tehsil Names in Hindi (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.hindi, 'hindi','तमिलनाडु', 'ऊटी', ExpectedOotyTehsils);
  });

  it("18. Validate Ooty Tehsil Names in Marathi (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.marathi, 'marathi','तामिळनाडू', 'उटी', ExpectedOotyTehsils);
  });

  it("19. Validate Ooty Tehsil Names in Tamil (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.tamil, 'tamil','தமிழ்நாடு', 'ஊட்டி', ExpectedOotyTehsils);
  });

  it("20. Validate Ooty Tehsil Names in Telugu (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.telugu, 'telugu','తమిళనాడు', 'ఊటీ', ExpectedOotyTehsils);
  });
});

describe("Used Pages - Noida Tehsil Validation", () => {
  it("21. Validate Noida Tehsil Names in English (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.english, 'english','Uttar Pradesh', 'Noida', ExpectedNoidaTehsils);
  });

  it("22. Validate Noida Tehsil Names in Hindi (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.hindi, 'hindi','उत्तर प्रदेश', 'नोएडा', ExpectedNoidaTehsils);
  });

  it("23. Validate Noida Tehsil Names in Marathi (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.marathi, 'marathi','उत्तर प्रदेश', 'सिल्वासा', ExpectedNoidaTehsils);
  });

  it("24. Validate Noida Tehsil Names in Tamil (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.tamil, 'tamil','உத்தரப்பிரதேசம்', 'நொய்டா', ExpectedNoidaTehsils);
  });

  it("25. Validate Noida Tehsil Names in Telugu (Used Pages)", () => {
    validateTehsilsMainPageForUsed(UsedPageUrls.telugu, 'telugu','ఉత్తర ప్రదేశ్', 'నోయిడా', ExpectedNoidaTehsils);
  });
});

});
