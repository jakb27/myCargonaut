const authUser = require('../fixtures/auth-user.json');

describe("Login Page",() => {
  it("should login with email and password",() => {
    const {email, password} = authUser;
    cy.visit("/sign-in");
    cy.get("input[type=text]").type(email);
    cy.get("input[type=password]").type(password);
    cy.get("input[type=button]").click({force: true});
    cy.visit("/dashboard");
    //cy.contains(".log-out").should("exist");
    //cy.get(".log-out").click({force: true});


  });
});
