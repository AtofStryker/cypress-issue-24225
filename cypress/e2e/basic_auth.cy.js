describe('Basic', () => {
  it('visits with basic auth', () => {
    cy.visit('http://www.testme.com:3000', {
      auth: {
        username: 'admin',
        password: 'supersecret',
      },
    })
    cy.get('#username').type('username')
    cy.get('#password').type('password')
    cy.get('[type="submit"]').click()
  })

  it('cy.origin with basic auth (does not work)', (done) => {
    Cypress.on('fail', (error) => {
      if(error.message.includes('failed trying to load')){
        done()
      }
      done(error)
    })
    cy.visit('cypress/fixtures/index.html')
    cy.origin('http://www.testme.com:3000', () => {
      cy.visit('http://www.testme.com:3000')
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('[type="submit"]').click()
    })
  })

  it('cy.origin with basic auth (works)', () => {
    cy.visit('cypress/fixtures/index.html')
    cy.origin('http://www.testme.com:3000', () => {
      cy.visit('http://www.testme.com:3000', {
        auth: {
          username: 'admin',
          password: 'supersecret',
        },
      })
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('[type="submit"]').click()
    })
  })
})