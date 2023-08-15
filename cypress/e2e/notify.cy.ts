beforeEach(() => {
  cy.visit('http://localhost:3000')
  cy.wait(500)
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

it('create sfc notification', () => {
  cy.get('button#sfc-create-notification').click()
  cy.get('div.v-snackbar--active').should('exist')
  cy.get('div.v-snackbar__wrapper').should('exist')
  cy.get('div.v-snackbar__content').should('contain', 'My SFC notification!')
  cy.get('div.v-snackbar__wrapper').should('have.class', 'bg-success')
})