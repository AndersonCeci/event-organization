describe("it will click on login and try to login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("will click on login link and enter credientials to login as admin", () => {
    cy.get('[data-test="login-register-link"]').click();
    cy.get('[data-test="secret-code-admin-login"]').type("admin");
    cy.get('[data-test="email-login-input"]').type("cypress@gmail.com");
    cy.get('[data-test="password-login-input"]').type("123");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/");
  });
});
