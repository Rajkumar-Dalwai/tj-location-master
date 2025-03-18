const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    // url: "https://t1tj.tractorfirst.com/",
     // url: "https://dv1tj.tractorfirst.com/",
    url: "https://www.tractorjunction.com/",
  },

  retries: {
    runMode: 1,
    openMode: 1, // Optional: Adds retries for interactive mode
  },

  e2e: {
    chromeWebSecurity: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 15000, // Adjusted for slower responses
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // Custom task for logging to the terminal
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Test file pattern
    // Uncomment if running feature files for BDD:
    // specPattern: 'cypress/e2e/BDD/*.feature'
  },
});