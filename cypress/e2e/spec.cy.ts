beforeEach(() => {
  cy.visit('http://localhost:3000')
  cy.wait(500)
  cy.window()
    .its('console')
    .then((console) => {
      cy.stub(console, 'error').throws('Console error')
    })
})

describe('server is started', () => {
  it('homepage title is present', () => {
    cy.get('h1').should('contain', 'Vuetify')
  })

  it('create dialog', () => {
    cy.get('button#create-dialog').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-card-title').should('contain', 'My dialog')
    cy.get('div.v-card-text').should('contain', 'Hello world!')
    cy.get('div.v-card-actions').find('button').should('have.length', 2)
  })

  it('success dialog', () => {
    cy.get('button#success-dialog').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-card-title').should('contain', 'My success dialog')
    cy.get('div.v-card-title').find('i').should('have.class', 'mdi-check-circle')
    cy.get('div.v-card-title').find('i').should('have.class', 'text-success')
    cy.get('div.v-card-text').should('contain', 'Hello world!')
    cy.get('div.v-card-actions').find('button').should('have.length', 1)
    cy.get('div.v-card-actions').find('button').should('have.class', 'text-success')
  })

  it('confirm dialog', () => {

    // Stub console.log to check if confirm dialog is true, because of click on confirm button
    cy.window()
      .its('console')
      .then((console) => {
        cy.stub(console, 'log').callsFake((msg) => {
          expect(typeof msg).to.equal('boolean')
          expect(msg).to.equal(true)
        })
      })
    cy.get('button#confirm-dialog').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-card-title').should('contain', 'My confirm dialog')
    cy.get('div.v-card-title').find('i').should('have.class', 'mdi-alert')
    cy.get('div.v-card-title').find('i').should('have.class', 'text-warning')
    cy.get('div.v-card-text').should('contain', 'Hello world!')
    cy.get('div.v-card-actions').find('button').should('have.length', 2)
    cy.get('div.v-card-actions').find('button').should('have.class', 'text-warning')
    cy.get('div.v-card-actions').find('button').should('have.class', 'text-grey')
    cy.get('div.v-card-actions').find('button').should('contain', 'Cancel button')
    cy.get('div.v-card-actions').find('button').should('contain', 'Confirm button')
    //click on confirm button
    cy.get('div.v-card-actions').find('button').eq(1).click()
  })

  it('create SFC dialog', () => {
    cy.get('button#sfc-create-dialog').click()
    cy.get('div.v-overlay--active').should('exist')
    cy.get('div.v-card-title').should('contain', 'My SFC dialog')
    cy.get('div.v-card-text').should('contain', 'Hello world!')
    cy.get('div.v-card-actions').find('button').should('have.length', 2)
  })

  it('create notification', () => {
    cy.get('button#create-notification').click()
    cy.get('div.v-snackbar--active').should('exist')
    cy.get('div.v-snackbar__wrapper').should('exist')
    cy.get('div.v-snackbar__content').should('contain', 'Hello world!')
    cy.get('div.v-snackbar__wrapper').should('have.class', 'bg-info')
  })

  it('error notification', () => {
    cy.get('button#error-notification').click()
    cy.get('div.v-snackbar--active').should('exist')
    cy.get('div.v-snackbar__wrapper').should('exist')
    cy.get('div.v-snackbar__content').should('contain', 'Hello error!')
    cy.get('div.v-snackbar__wrapper').should('have.class', 'bg-error')
  })
})