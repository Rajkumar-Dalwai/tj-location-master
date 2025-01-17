/// <reference types="cypress" />

describe('Page Load Speed Test', () => {
    const baseUrl = Cypress.env('url'); // Retrieve the base URL from the config file
    const paths = [
      "",
      "mahindra-tractor/575-di-xp-plus/",
      "mahindra-tractor/",
      "compare-tractors/",
      "tractor-loan-emi-calculator/",
      "tractor-loan/",
      "about-us/",
      "privacy-policy/",
      "on-road-price/",
      "find-tractor-dealers/",
      "find-tractor-dealers/mahindra/",
      "tractor-dealership-enquiry/",
      "become-certified-dealer/",
      "contact-us/",
      "tractor-news/mahindra-585-di-power-plus-bp-affordable-tractor-for-farming/",
      "tractors/",
      "upcoming-tractors/",
      "latest-tractors/",
      "tyres/",
      "mini-tractors/",
      "news/",
      "popular-tractors/",
      "used-tractors-for-sell/?stateid=33&distid=555",
      "sell-used-tractor/",
      "videos/",
      "tractor-implements/",
      "tractor-combine-harvesters/",
      "ac-cabin-tractors/",
      "4wd-tractors/",
      "web-stories/",
      "blog/",
      "electric-tractors/",
      "used-tractors/mini/?stateid=33&distid=555",
      "used-farm-implements-for-sell/",
      "used-harvester-for-sell/",
      "sell/farm-implements/",
      "sell/harvester/",
      "used-tractor-loan/",
      "loan-against-tractor/",
      "personal-loan/",
      "loan/",
      "tractor-insurance/",
      "tractor-service-centers/",
      "2wd-tractors/",
      "trem-iv-tractors/",
      "special-tractor-offers/",
      "sitemap/",
      "advertise-with-us/",
      "tractor-subsidy-in-india/",
      "weather-news/",
      "agri-business-news/",
      "sarkari-yojana-news/",
      "machinery-news/",
      "social-news/",
      "animal-husbandry-news/",
      "broker-dealers/",
      "dealer-distributor-franchise/",
      "implement/fieldking/",
      "implements/fieldking/tillage/",
      "implements/fieldking/harrow/",
      "used-farm-implements/fieldking/",
      "used-farm-implements-in-uttar-pradesh/",
      "used-farm-implements-for-sell/thresher/",
      "tractor-implements/rotary-tiller-rotavator/"
    ];

     // Suppress uncaught exceptions to prevent test failure
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Failed to execute 'getCurrentPosition'")) {
      // Returning false here prevents Cypress from failing the test
      return false;
    }
    // Allow other exceptions to fail the test
    return true;
  });
  
    paths.forEach((path) => {
      it(`should load the page within 3 seconds - ${path}`, () => {
        const startTime = new Date().getTime();
  
        cy.visit(`${baseUrl}${path}`).then(() => {
          const loadTime = new Date().getTime() - startTime;
  
          // Log the load time
          cy.log(`Page loaded in ${loadTime} ms`);
  
          // Assert that the load time is within 3 seconds
          expect(loadTime).to.be.lessThan(3000, `Page ${path} took too long to load`);
        });
      });
    });
  });
  