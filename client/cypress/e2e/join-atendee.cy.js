describe("it will join as atendee", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("will join as attendee", () => {
    cy.get('[data-test="login-register-link"]').click();
    cy.get('[data-test="email-login-input"]').type("cypress@gmail.com");
    cy.get('[data-test="password-login-input"]').type("123");
    cy.get('[data-test="login-button"]').click({ multiple: true });
    cy.url().should("include", "/");
    cy.wait(50);
    cy.get('[data-test="event-details-button"]')
      .eq(0)
      .click({ multiple: true });
    cy.get('[data-test="join-attende-input"]').type("Cypress Atendee");
    cy.get('[data-test="join-attende-button"]').click();
    cy.get('[data-test="joined-attende-name"]').contains("Cypress Atendee");
  });
});
