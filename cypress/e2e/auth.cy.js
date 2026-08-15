describe('Authentication', () => {
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123'
  }

 // first test case in auth.cy.js file 
  it('shows error on invalid credentials', () => {
    cy.visit('/login')
    cy.get('[data-cy="login-email-input"]').type('invalid@example.com')
    cy.get('[data-cy="login-password-input"]').type('wrongpassword')
    cy.get('[data-cy="login-button"]').click()

   // this is assertion 
    cy.get('[data-cy="login-error"]').should('be.visible')
  })

 // second test case in auth.cy.js file 
  it('allows user to sign up', () => {
    cy.signup(testUser.name, testUser.email, testUser.password)
    
    // Check successful redirect to login
    cy.url().should('include', '/login')
    cy.get('[data-cy="login-heading"]').should('contain', 'Login')
  })

 // third test case 
  it('allows user to log in', () => {
    const newUser = {
      name: 'Login Test',
      email: `login${Date.now()}@example.com`,
      password: 'password123'
    }
    
    // Pre-register user using API directly so we can test the UI login flow
    cy.request('POST', 'http://localhost:5000/api/auth/register', newUser).then(() => {
      cy.login(newUser.email, newUser.password)
      cy.url().should('include', '/dashboard')
      cy.get('[data-cy="welcome-heading"]').should('contain', newUser.name)
    })
  })

 // fourth test case logout 

  it('allows user to log out', () => {
    const logoutUser = {
      name: 'Logout Test',
      email: `logout${Date.now()}@example.com`,
      password: 'password123'
    }

    cy.request('POST', 'http://localhost:5000/api/auth/register', logoutUser).then(() => {
      cy.login(logoutUser.email, logoutUser.password)
      cy.url().should('include', '/dashboard')
      
      cy.get('[data-cy="logout-button"]').click()
      cy.url().should('include', '/login')
    })
  })
})
