describe('Tasks CRUD', () => {
  const user = {
    name: 'Task Master',
    email: `tasks${Date.now()}@example.com`,
    password: 'password123'
  }

  before(() => {
    // Register the user once before all tasks
    cy.request('POST', 'http://localhost:5000/api/auth/register', user)
  })

  beforeEach(() => {
    // Login before each test
    cy.login(user.email, user.password)
    cy.url().should('include', '/dashboard')
  })

  it('shows empty state initially', () => {
    cy.get('[data-cy="empty-state"]').should('be.visible')
    cy.get('[data-cy="task-list-count"]').should('contain', '0')
  })

  it('can create a new task', () => {
    const taskTitle = 'My first e2e task'
    
    cy.get('[data-cy="task-input"]').type(taskTitle)
    cy.get('[data-cy="add-task-button"]').click()

    cy.get('[data-cy="task-card"]').should('have.length', 1)
    cy.get('[data-cy="task-title"]').should('contain', taskTitle)
    cy.get('[data-cy="task-list-count"]').should('contain', '1')
  })

  it('can toggle task completion', () => {
    cy.get('[data-cy="task-checkbox"]').first().check()
    cy.get('[data-cy="task-card"]').first().should('have.class', 'completed')

    cy.get('[data-cy="task-checkbox"]').first().uncheck()
    cy.get('[data-cy="task-card"]').first().should('not.have.class', 'completed')
  })

  it('can edit a task', () => {
    const updatedTitle = 'Updated task title'
    
    cy.get('[data-cy="edit-task-button"]').first().click()
    cy.get('[data-cy="edit-modal"]').should('be.visible')
    
    cy.get('[data-cy="edit-task-input"]').clear().type(updatedTitle)
    cy.get('[data-cy="save-edit-button"]').click()
    
    cy.get('[data-cy="edit-modal"]').should('not.exist')
    cy.get('[data-cy="task-title"]').first().should('contain', updatedTitle)
  })

  it('can delete a task', () => {
    cy.get('[data-cy="delete-task-button"]').first().click()
    cy.get('[data-cy="delete-modal"]').should('be.visible')
    
    cy.get('[data-cy="confirm-delete-button"]').click()
    
    cy.get('[data-cy="delete-modal"]').should('not.exist')
    cy.get('[data-cy="task-card"]').should('have.length', 0)
    cy.get('[data-cy="empty-state"]').should('be.visible')
  })
})
