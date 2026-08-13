describe('Navigation and Route Protection', () => {
  it('redirects unauthenticated users to /login', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
  })

  it('redirects unauthenticated users trying to access /dashboard to /login', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/login')
  })

  it('allows navigation between login and signup', () => {
    cy.visit('/login')
    cy.get('[data-cy="goto-signup-link"]').click()
    cy.url().should('include', '/signup')
    cy.get('[data-cy="signup-heading"]').should('contain', 'Create Account')

    cy.get('[data-cy="goto-login-link"]').click()
    cy.url().should('include', '/login')
    cy.get('[data-cy="login-heading"]').should('contain', 'Login')
  })
})
