
const authUser = require("../fixtures/auth-user.json");

describe("Login Page",() => {
  it("should login with email and password",async () => {
    const {email, password} = authUser;
    cy.visit("/sign-in");
    cy.get("input[type=text]").type(email);
    cy.get("input[type=password]").type(password);
    cy.get(".btn-log-in").click({force: true}).then(() => {
      cy.visit("/dashboard", {timeout: 60000});
    });
    //cy.get(".log-out", {timeout: 60000}).should("exist");
    //cy.get(".log-out", {timeout: 60000}).click({force: true});





  });
});
