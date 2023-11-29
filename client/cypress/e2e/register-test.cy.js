describe("it will click on register and try to register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("will click on register link and enter credientials to register and then it will log in", () => {
    cy.get('[data-test="login-register-link"]').click();
    cy.get('[data-test="register-link"]').click();
    cy.get('[data-test="name-register-input"]').type("Cypress");
    cy.get('[data-test="email-register-input"]').type("cypress@gmail.com");
    cy.get('[data-test="password-register-input"]').type("123");
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="email-login-input"]').type("anderson@gmail.com");
    cy.get('[data-test="password-login-input"]').type("123");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/");
  });
});
