describe("it will add user from admin panel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("will add user from admin panel", () => {
    // Login
    cy.get('[data-test="login-register-link"]').click();
    cy.get('[data-test="secret-code-admin-login"]').type("admin");
    cy.get('[data-test="email-login-input"]').type("cypress@gmail.com");
    cy.get('[data-test="password-login-input"]').type("123");
    cy.get('[data-test="login-button"]').click();
    cy.wait(100);
    // Add a user
    cy.visit("http://localhost:3000/user-list");
    cy.get('[data-test="add-user-button-list"]').click();
    cy.get('[data-test="add-user-name"]').type("Cypress Test");
    cy.get('[data-test="add-user-email"]').type("cypresstest@gmail.com");
    cy.get('[data-test="add-user-password"]').type("123");
    cy.get('[data-test="add-user-button"]').click();

    // Check if the added user is displayed in the list
    cy.get('[data-test="users-list"]').should("exist");
    cy.get('[data-test="users-list"]').eq(-1).contains("Cypress Test");
    cy.get('[data-test="users-list"]').eq(-1).contains("cypresstest@gmail.com");
  });
});
