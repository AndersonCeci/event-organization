describe("it will edit an event", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("will edit an event", () => {
        cy.get('[data-test="login-register-link"]').click();
        cy.get('[data-test="email-login-input"]').type("cypress@gmail.com");
        cy.get('[data-test="password-login-input"]').type("123");
        cy.get('[data-test="login-button"]').click({ multiple: true });
        cy.url().should("include", "/");
        cy.wait(50);
        cy.get('[data-test="event-details-button"]').eq(0).click({multiple: true});
        cy.get('[data-test="edit-event-button"]').click();
        cy.get('[data-test="edit-event-name-input"]').clear();
        cy.get('[data-test="edit-event-name-input"]').type("Cypress Test");
        cy.get('[data-test="edit-event-description-input"]').clear();
        cy.get('[data-test="edit-event-description-input"]').type("Cypress Description Edited");
        cy.get('[data-test="save-changes-button"]').click();
        cy.get('[data-test="event-name-edited"]').contains("Cypress Test");
        cy.get('[data-test="event-description-edited"]').contains("Cypress Description Edited");
        cy.visit("http://localhost:3000/");
        cy.get('[data-test="event-name-home"]').contains("Cypress Test");        
    });
});
