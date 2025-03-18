describe('State Subsidy Section - Validate States', () => {
    it('should contain all required states in the subsidy section', () => {
      const expectedStates = [
        "Andaman And Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Gujarat",
        "Haryana",
        "Jammu And Kashmir",
        "Jharkhand",
        "Karnataka",
        "Madhya Pradesh",
        "Maharashtra",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Telangana",
        "Uttar Pradesh",
        "West Bengal"
      ];
  
      // Visit the page
      cy.visit('https://t1tj.tractorfirst.com/news/');
  
      // Wait for elements to load
      cy.wait(5000);
  
      // Get all states under the "State Subsidy" section dynamically
      cy.get(':nth-child(3) > .news-cate-sidebar > .weblink', { timeout: 10000 }) // Select all state elements
        .should('have.length.at.least', expectedStates.length) // Ensure at least expected states are present
        .then(($elements) => {
          const actualStates = $elements.map((index, el) => Cypress.$(el).text().trim()).get();
  
          // Validate that all expected states are present
          expect(actualStates).to.include.members(expectedStates);
        });
    });
  });
  