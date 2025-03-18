describe('Check for jQuery errors across multiple URLs', () => {
    const urls = [
        'https://www.tractorjunction.com/tractor-news/sonalika-records-highest-ever-ytd-tractor-sales-in-feb-2025/',
        // Add more URLs here if needed
    ];

    beforeEach(() => {
        // Prevent Cypress from failing due to uncaught exceptions
        Cypress.on('uncaught:exception', (err) => {
            cy.log(`Uncaught Exception: ${err.message}`);
            return false; // Prevent test failure
        });
    });

    urls.forEach((url) => {
        it(`Checking jQuery errors for ${url}`, () => {
            cy.visit(url);

            // Ensure jQuery is available before checking errors
            cy.window().should('have.property', 'jQuery').then((jquery) => {
                cy.wrap(jquery).should('exist');
                cy.log('✅ jQuery is available');
            });

            // Capture console errors
            cy.window().then((win) => {
                cy.spy(win.console, 'error').as('consoleError');
            });

            // Wait for any async scripts to load
            cy.wait(3000);

            // Validate if any console errors were logged
            cy.get('@consoleError').then((consoleError) => {
                if (consoleError.callCount > 0) {
                    cy.log('⚠️ jQuery errors detected:');
                    consoleError.getCalls().forEach((call, index) => {
                        cy.log(`Error ${index + 1}: ${call.args[0]}`);
                    });

                    // **Fail the test if any jQuery error is found**
                    throw new Error('❌ Test failed due to jQuery errors');
                } else {
                    cy.log('✅ Page is not having jQuery errors');
                }
            });
        });
    });
});
