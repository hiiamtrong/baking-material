/* eslint-disable no-undef */
const baseUrl = Cypress.config().baseUrl
describe('Login', () => {
  it('Wrong Username', () => {
    cy.visit('localhost:3000')
    cy.wait(200)
    cy.get("[data-cy='username-input']").type('trong1')
    cy.get("[data-cy='password-input']").type('12345678')
    cy.contains('Sign In').click()
    cy.wait(500)
    cy.get('.Toastify__toast-container')
      .invoke('text')
      .should('eq', '⛔ Không tìm thấy tài khoản đăng nhập')
    cy.url().should('eq', baseUrl + '/auth/login')
  })

  it('Wrong Password', () => {
    cy.visit('localhost:3000')
    cy.wait(200)
    cy.get("[data-cy='username-input']").type('trong')
    cy.get("[data-cy='password-input']").type('123456')
    cy.contains('Sign In').click()
    cy.wait(500)
    cy.get('.Toastify__toast-container')
      .invoke('text')
      .should('eq', '⛔ Sai mật khẩu')
    cy.url().should('eq', baseUrl + '/auth/login')
  })

  it('Success', () => {
    cy.visit('/auth/login')
    cy.wait(200)
    cy.get("[data-cy='username-input']").type('trong')
    cy.get("[data-cy='password-input']").type('12345678')
    cy.contains('Sign In').click()
    cy.wait(500)
    cy.get('.Toastify__toast-container')
      .invoke('text')
      .should('eq', '✔️ Đăng nhập thành công')
    cy.url().should('eq', baseUrl + '/home') // => true
  })
})
