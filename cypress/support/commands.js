// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy="login-email-input"]').type(email)
  cy.get('[data-cy="login-password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
})

Cypress.Commands.add('signup', (name, email, password) => {
  cy.visit('/signup')
  cy.get('[data-cy="signup-name-input"]').type(name)
  cy.get('[data-cy="signup-email-input"]').type(email)
  cy.get('[data-cy="signup-password-input"]').type(password)
  cy.get('[data-cy="signup-button"]').click()
})
