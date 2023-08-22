beforeEach(() => {
  cy.visit('http://localhost:3000')
  cy.wait(500)
})

describe('server is started', () => {
  it('homepage title is present', () => {
    cy.get('h1').should('contain', 'Vuetify')
  })

  it('create bottom-sheet card', () => {
    cy.get('button#create-bottomsheet-card').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-overlay--active').should('have.class', 'v-bottom-sheet')
    cy.get('div.v-card-title').should('contain', 'My bottom-sheet card dialog')
    cy.get('div.v-card-text').should('contain', 'Hello world!')
    cy.get('div.v-card-actions').find('button').should('have.length', 2)
  })

  it('create bottom-sheet list', () => {
    cy.get('button#create-bottomsheet-list').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-overlay--active').should('have.class', 'v-bottom-sheet')
    cy.get('div.v-bottom-sheet__content').should('exist')
    cy.get('div.v-bottom-sheet__content').find('div.v-list').should('exist')
    cy.get('div.v-bottom-sheet__content').find('div.v-list').find('div.v-list-item').should('have.length', 3)
  })

  it('create SFC bottom-sheet card', () => {
    cy.get('button#sfc-create-bottomsheet').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-overlay--active').should('have.class', 'v-bottom-sheet')
    cy.get('div.v-card-title').should('contain', 'My SFC bottom-sheet')
    cy.get('div.v-card-text').should('contain', 'Hello world!')
    cy.get('div.v-card-actions').should('not.exist')
  })
})