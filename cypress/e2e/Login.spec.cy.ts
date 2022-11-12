import incorrectLoginCreds from '../fixtures/incorrectLoginCreds.json'
import loginCreds from '../fixtures/loginCreds.json'

describe('Login flow test', () => {
  it('Login form should be displayed', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-e2e="username"]').should('have.value', '');
    cy.get('[data-e2e="password"]').should('have.value', '');

    cy.get('[data-e2e="signUp"]')
    cy.get('[data-e2e="signIn"]')
  })

  it('Sign Up Form should be open when user clicks Sign Up button', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-e2e="signUp"]').click()
  })

  it('Should display "Incorrect password" message when incorrect password is entered', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-e2e="username"]').type(incorrectLoginCreds.username)
    cy.get('[data-e2e="password"]').type(incorrectLoginCreds.incorrectPassword)

    cy.intercept({ method: 'POST', url: 'login' }).as('loginApi')
    cy.get('[data-e2e="signIn"]').click()

    cy.wait('@loginApi', { timeout: 15000 }).then(() => {
      cy.get('[data-e2e="passwordHelperText"]').contains('Invalid username or password')
    })
  })

  it('Should login with correct user name and password', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-e2e="username"]').type(loginCreds.username)
    cy.get('[data-e2e="password"]').type(loginCreds.password)

    cy.intercept({ method: 'POST', url: 'login' }).as('loginApi')
    cy.get('[data-e2e="signIn"]').click()

    cy.wait('@loginApi', { timeout: 15000 }).then(() => {
      cy.get('[data-e2e="toDoListForm"]')
    })
  })
})