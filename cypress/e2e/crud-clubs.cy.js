/// < require types="Cypress" />

const URL = 'http://localhost:8080/'

context('crud-clubs', () => {
  before(() => {
    cy.visit(URL)

    cy.intercept('POST', `${URL}reset`).as('reset')
    cy.get('#button-reset').click()
    cy.wait('@reset')
  })

  describe('View team', () => {
    it('should view a team', () => {
      cy.get('a[href="/teams/ARS"]').click()

      cy.url().should('eq', `${URL}teams/ARS`)

      cy.get('h2').should('have.text', 'Arsenal FC')
      cy.get('h3').should('have.text', 'Website')
      cy.get('h3>a').should('have.attr', 'href', 'http://www.arsenal.com')
    })
  })

  describe('Delete team', () => {
    it('should delete a team', () => {
      cy.intercept('DELETE', `${URL}teams/ARS`).as('delete')
      cy.get('#button-delete').click()

      cy.visit(URL)
      cy.get('strong').should('have.text', '19')
    })
  })

  describe('Reset teams', () => {
    it('should reset teams', () => {
      cy.intercept('GET', `${URL}teams`).as('teams')
      cy.get('#button-reset').click()

      cy.get('strong').should('have.text', '20')
    })
  })

  describe('Add new team', () => {
    it('should navigate to the form to add a new team', () => {
      cy.visit(URL)
      cy.intercept('GET', `${URL}teams`).as('teams')
      cy.get('#button-add').click()

      cy.url().should('eq', `${URL}/teams/create`)
    })

    it('should try to create a new team with invalid data', () => {
      cy.intercept('POST', `${URL}teams/create`).as('create')
      cy.get('button[type=submit]').click()

      cy.get('.toast').should('have.length', 6)
    })

    it('should create a new team with valid data', () => {
      cy.get('#name').type('Wakanda Panthers')
      cy.get('#abbreviation').type('WKP')
      cy.get('#country').type('Argentina')
      cy.get('#image').uploadFile('../cypress/fixtures/image.png', 'image.png')
      cy.get('#address').type('Calle 123')
      cy.get('#phone').type('1234567890')
      cy.get('#website').type('https://wakandapanthers.com.ar')
      cy.get('#email').type('wakandapanthers@cypress.io')
      cy.get('#founded').type('2020')
      cy.get('#colors').type('Pink / Black')
      cy.get('#stadium').type('Malvinas')

      cy.intercept('POST', `${URL}teams/create`).as('create')
      cy.get('button[type=submit]').click()
      cy.wait('@create')

      cy.get('.toast').should('have.length', 1)

      cy.url().should('eq', `${URL}teams/WKP`)
    })
  })

  describe('Edit team', () => {
    it('should navigate to the form to edit a team', () => {
      cy.visit(URL)
      cy.get("a[href='/teams/ARS/edit']").click()
      cy.url().should('eq', `${URL}teams/ARS/edit`)
    })

    it('should edit the teams name', () => {
      cy.get('#name').clear()
      cy.get('#name').type('Arsenal ARG')
      cy.get('button[type=submit]').click()

      cy.get('.toast').should('have.length', 1)

      cy.url().should('eq', `${URL}teams/ARS`)
      cy.get('h2').should('have.text', 'Arsenal ARG')
    })
  })
})
