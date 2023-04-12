import { Given } from 'cypress-cucumber-preprocessor/steps';
import { When } from 'cypress-cucumber-preprocessor/steps';
import { Then } from 'cypress-cucumber-preprocessor/steps';

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário adiciona o nome {string}, CPF {string}, username {string}, email {string}, senha {string} e escolhe ir para a próxima etapa',
  (name: string, CPF: string, username: string, email: string, password: string) => {
    cy.get('.name input').type(name);
    cy.get('.CPF input').type(CPF);
    cy.get('.username input').type(username);
    cy.get('.email input').type(email);
    cy.get('.password input').type(password);
    cy.get('.next-button').click();
  }
);

Then (
  'o usuário recebe uma mensagem {string}',
  (message: string) => {
    cy.get('.error-snackbar').should('be.visible');
  }
);

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário adiciona o nome {string}, CPF {string}, username {string}, email {string}, senha {string} e escolhe ir para a próxima etapa',
  (name: string, CPF: string, username: string, email: string, password: string) => {
    cy.get('.name input').type(name);
    cy.get('.CPF input').type(CPF);
    cy.get('.username input').type(username);
    cy.get('.email input').type(email);
    cy.get('.password input').type(password);
    cy.get('.next-button').click();
  }
);

Then (
  'o usuário recebe uma mensagem {string}',
  (message: string) => {
    cy.get('.error-snackbar').should('be.visible');
  }
);

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário adiciona o nome {string}, CPF {string}, username {string}, email {string}, senha {string} e escolhe ir para a próxima etapa',
  (name: string, CPF: string, username: string, email: string, password: string) => {
    cy.get('.name input').type(name);
    cy.get('.CPF input').type(CPF);
    cy.get('.username input').type(username);
    cy.get('.email input').type(email);
    cy.get('.password input').type(password);
    cy.get('.next-button').click();
  }
);

Then (
  'o usuário recebe uma mensagem {string}',
  (message: string) => {
    cy.get('.error-snackbar').should('be.visible');
  }
);

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário adiciona o nome {string}, CPF {string} e username {string}',
  (name: string, CPF: string, username: string) => {
    cy.get('.name input').type(name);
    cy.get('.CPF input').type(CPF);
    cy.get('.username input').type(username);
  }
);

Then (
  'o usuário recebe uma mensagem de erro {string}',
  (message: string) => {
    cy.get('mat-error').should('contain', message);
  }
);

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário adiciona a senha {string} e username {string}',
  (password: string, username: string) => {
    cy.get('.password input').type(password);
    cy.get('.username input').type(username);
  }
);

Then (
  'o usuário recebe uma mensagem de erro {string}',
  (message: string) => {
    cy.get('mat-error').should('contain', message);
  }
);

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário adiciona o email {string} e username {string}',
  (email: string, username: string) => {
    cy.get('.email input').type(email);
    cy.get('.username input').type(username);
  }
);

Then (
  'o usuário recebe uma mensagem de erro {string}',
  (message: string) => {
    cy.get('mat-error').should('contain', message);
  }
);

Given(
  'o usuário está na página de {string}',
  (page: string) => {
    cy.visit(page, { timeout: 60000 });
  }
);

When(
  'o usuário escolhe ir para a próxima etapa',
  () => {
    cy.get('.next-button').click();
  }
);

Then (
  'o usuário está na página de {string}',
  (page: string) => {
    cy.url().should('include', page)
  }
);