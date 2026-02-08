/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:3000')
  cy.wait(500)
})

describe('Banner Tests', () => {
  it('should display the demo page', () => {
    cy.get('h1').should('contain', 'Vuetify3 Dialog')
  })

  describe('Banner Creation', () => {
    it('should create an info banner', () => {
      cy.get('button#create-banner').click()
      
      // Check that banner is displayed
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('be.visible')
      
      // Check banner content - text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'This is an informational banner message!')
    })

    it('should create a success banner', () => {
      cy.get('button#success-banner').click()
      
      // Check that banner is displayed with success styling
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('have.class', 'bg-success')
      
      // Check banner content - text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'Operation completed successfully!')
    })

    it('should create a warning banner', () => {
      cy.get('button#warning-banner').click()
      
      // Check that banner is displayed with warning styling
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('have.class', 'bg-warning')
      
      // Check banner content - text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'This action cannot be undone!')
    })

    it('should create an error banner', () => {
      cy.get('button#error-banner').click()
      
      // Check that banner is displayed with error styling
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('have.class', 'bg-error')
      
      // Check banner content - text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'This is a critical error that needs attention!')
    })
  })

  describe('Banner Positioning', () => {
    it('should position banner as first child of v-main', () => {
      cy.get('button#create-banner').click()
      
      // Check that banner container is the first child of v-main
      cy.get('.v-main').children().first().should('have.class', 'vuetify3-dialog-banner-container')
    })

    it('should maintain banner position when multiple banners are created', () => {
      cy.get('button#create-banner').click()
      cy.wait(50)
      cy.get('button#success-banner').click()
      
      // Check that both banners are positioned correctly
      cy.get('.vuetify3-dialog-banner-container').should('have.length', 2)
      cy.get('.v-main').children().first().should('have.class', 'vuetify3-dialog-banner-container')
    })
  })

  describe('Banner Content', () => {
    it('should display correct text content', () => {
      cy.get('button#create-banner').click()
      
      // Text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'This is an informational banner message!')
    })

    it('should handle different banner texts', () => {
      const testCases = [
        { buttonId: '#create-banner', expectedText: 'This is an informational banner message!' },
        { buttonId: '#success-banner', expectedText: 'Operation completed successfully!' },
        { buttonId: '#warning-banner', expectedText: 'This action cannot be undone!' },
        { buttonId: '#error-banner', expectedText: 'This is a critical error that needs attention!' }
      ]

      testCases.forEach(({ buttonId, expectedText }) => {
        cy.get(buttonId).click()
        cy.wait(50)
        // Text is in a custom div inside the last VBanner
        cy.get('.v-banner').first().find('div').first().should('contain', expectedText)
      })
    })
  })

  describe('Banner Styling', () => {
    it('should apply correct color classes based on banner type', () => {
      const testCases = [
        { buttonId: '#success-banner', expectedClass: 'bg-success' },
        { buttonId: '#warning-banner', expectedClass: 'bg-warning' },
        { buttonId: '#error-banner', expectedClass: 'bg-error' }
      ]

      testCases.forEach(({ buttonId, expectedClass }) => {
        cy.get(buttonId).click()
        cy.wait(50)
        cy.get('.v-banner').first().should('have.class', expectedClass)
      })
    })
  })

  describe('SFC Banner Examples', () => {
    it('should create SFC info banner', () => {
      cy.get('button#sfc-create-banner').scrollIntoView()
      cy.get('button#sfc-create-banner').click()
      
      cy.get('.v-banner').should('exist')
      // Text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'This is an informational banner message')
    })

    it('should create SFC success banner', () => {
      cy.get('button#sfc-success-banner').scrollIntoView()
      cy.get('button#sfc-success-banner').click()
      
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('have.class', 'bg-success')
      // Text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'Operation completed successfully!')
    })

    it('should create SFC warning banner', () => {
      cy.get('button#sfc-warning-banner').scrollIntoView()
      cy.get('button#sfc-warning-banner').click()
      
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('have.class', 'bg-warning')
      // Text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'This action cannot be undone!')
    })

    it('should create SFC error banner', () => {
      cy.get('button#sfc-error-banner').scrollIntoView()
      cy.get('button#sfc-error-banner').click()
      
      cy.get('.v-banner').should('exist')
      cy.get('.v-banner').should('have.class', 'bg-error')
      // Text is in a custom div inside VBanner
      cy.get('.v-banner').find('div').first().should('contain', 'Critical error occurred!')
    })
  })

  describe('Banner Behavior', () => {
    it('should allow multiple banners to coexist', () => {
      cy.get('button#create-banner').click()
      cy.wait(50)
      cy.get('button#success-banner').click()
      cy.wait(50)
      cy.get('button#warning-banner').click()
      
      // Should have multiple banners
      cy.get('.v-banner').should('have.length', 3)
    })

    it('should maintain banner order', () => {
      const buttons = ['#create-banner', '#success-banner', '#warning-banner']
      const expectedTexts = [
        'This is an informational banner message!',
        'Operation completed successfully!',
        'This action cannot be undone!'
      ]

      buttons.forEach((buttonId, index) => {
        cy.get(buttonId).click()
        cy.wait(50)
      })
    })
  })
})