describe("it will create an event", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
  
    it("will create an event", () => {
      cy.get('[data-test="login-register-link"]').click();
      cy.get('[data-test="email-login-input"]').type("cypress@gmail.com")
      cy.get('[data-test="password-login-input"]').type("123")
      cy.get('[data-test="login-button"]').click({multiple: true});
      cy.wait(100);
      // cy.get('[data-test="create-event-button"]').click();
      cy.visit("http://localhost:3000/create-event");
      cy.get('[data-test="create-event-name-input"]').type("Cypress delete");
      cy.get('[data-test="create-event-description-input"]').type(
        "Cypress description delete"
      );
      const inputDate = "12/25/2023";
      const [month, day, year] = inputDate.split('/');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      cy.get('[data-test="create-event-date-input"]').type(formattedDate);
      cy.get('[data-test="create-event-location-input"]').type(
        "Cypress Location"
      );
      cy.get('[data-test="create-event-button-input"]').click({multiple: true});
      cy.url().should("include", "/");
              cy.get('[data-test="event-details-button"]').eq(0).click({multiple: true});
              cy.get('[data-test="delete-event-button"]').click();
      });
  });
  