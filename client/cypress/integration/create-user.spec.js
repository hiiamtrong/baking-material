/* eslint-disable no-undef */
const baseUrl = Cypress.config().baseUrl
describe('Create User', () => {
  it('create without login', () => {
    cy.visit('/users/create')
    cy.url().should('eq', baseUrl + '/auth/login')
  })

  it('Success', () => {
    cy.login('trong', '12345678')
    cy.wait(1500)

    cy.visit('/users/create')
    cy.get('[data-cy="input-username"]').type('xuantrong')
    cy.get('[data-cy="input-displayname"]').type('Vu Xuan Trong')
    cy.get('[data-cy="input-email"]').type('hiiamtrong@xyzgmail.com')
    cy.contains('Admin').click()
  })

  it('Fail when incorrect email', () => {
    cy.login('trong', '12345678')
    cy.wait(1500)

    cy.visit('/users/create')

    cy.get('[data-cy="input-username"]').type('xuantrong')
    cy.get('[data-cy="input-displayname"]').type('Vu Xuan Trong')
    cy.get('[data-cy="input-email"]').type('gmail.hello')
    cy.contains('Admin').click()
    cy.get('[data-cy="button-create"]').click()
    cy.get('#email-helper-text').invoke('text').should('eq', 'Email invalid')
    cy.wait(500)
  })
})
