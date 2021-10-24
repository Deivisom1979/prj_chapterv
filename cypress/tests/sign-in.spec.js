/// <reference types="cypress" />

describe('Validar cenário de login na aplicação', () => {
  it('1) Clicar no botão Sign in com os campos vazios', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users/login'
    }, {
      /* RouteHandler */
      statusCode: 422,
      fixture: 'email-blank.json'
    }).as('postLogin')

    cy.visit('login')
    cy.get('[placeholder=Email]')
    cy.get('[placeholder=Password]')
    cy.get('button.btn-primary').click()

    cy.contains("email can't be blank").should('be.visible')
  })

  it('2) Pressionar <enter> no campo de e-mail', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users/login'
    }, {
      /* RouteHandler */
      statusCode: 422,
      fixture: 'email-blank.json'
    }).as('postLogin')

    cy.visit('login')
    cy.get('input[type=email]').type('{enter}')
    cy.get('input[type=password]')
    cy.get('button[type=submit]')

    cy.contains("email can't be blank").should('be.visible')
  })

  it('3) Preencher o campo de e-mail e clicar no botão Sign in', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users/login'
    }, {
      /* RouteHandler */
      statusCode: 422,
      fixture: 'password-blank.json'
    }).as('postLogin')

    cy.visit('login')
    cy.get('input[type=email]').type('DesafioChapterV@test.com')
    cy.get('input[type=password]')
    cy.get('button[type=submit]').click()

    cy.contains("password can't be blank").should('be.visible')
  })

  it('4) Preencher o campo de e-mail e pressionar <enter> no campo de e-mail', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users/login'
    }, {
      /* RouteHandler */
      statusCode: 422,
      fixture: 'password-blank.json'
    }).as('postLogin')

    cy.visit('login')
    cy.get('input[type=email]').type('DesafioChapterV@test.com{enter}')
    cy.get('input[type=password]')
    cy.get('button[type=submit]')

    cy.contains("password can't be blank").should('be.visible')
  })

  it('5) Informar e-mail não cadastrado e senha cadastrada', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users/login'
    }, {
      /* RouteHandler */
      statusCode: 422,
      fixture: 'email-password.json'
    }).as('postLogin')

    cy.visit('login')
    cy.get('input[type=email]').type('ChapterV_Desafio@test.com')
    cy.get('input[type=password]').type('123456')
    cy.get('button[type=submit]').click()

    cy.contains('email or password is invalid').should('be.visible')
  })

  it('6) Informar e-mail válido e senha não cadastrada', () => {
    cy.intercept({
      method: 'POST',
      path: '/api/users/login'
    }, {
      /* RouteHandler */
      statusCode: 422,
      fixture: 'email-password.json'
    }).as('postLogin')

    cy.visit('login')
    cy.get('input[type=email]').type('DesafioChapterV@test.com')
    cy.get('input[type=password]').type('654321')
    cy.get('button[type=submit]').click()

    cy.contains('email or password is invalid').should('be.visible')
  })

  it('7) Preencher email e senha válidos e clicar no botão Sign in', () => {
    cy.visit('login')
    cy.get('input[type=email]').type('DesafioChapterV@test.com')
    cy.get('input[type=password]').type('123456')
    cy.get('button[type=submit]').click()

    cy.contains('No articles are here... yet.').should('be.visible')
  })

  it('8) Preencher email e senha válidos e pressionar <enter>', () => {
    cy.visit('login')
    cy.get('input[type=email]').type('DesafioChapterV@test.com')
    cy.get('input[type=password]').type('123456')
    cy.get('button[type=submit]').click()

    cy.contains('No articles are here... yet.').should('be.visible')
  })
})
