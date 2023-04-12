import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { envLogin } from '../../environments/env.login';

const urlHome = "/";
const urlLogin = "/authentication/sign-in";
const urlRecoverPassword =  "/authentication/recover-password";

Given(
  'o usuário está na página de {string}',
  (screen: string) => {
    if(screen == "login"){
      cy.visit(urlLogin);
    }
    if (screen == "esqueci senha"){
      cy.visit(urlRecoverPassword);
    }
    if(screen == "recuperar senha"){
      cy.visit(urlLogin);
      cy.get('a:eq(0)').click();
      cy.get('input[placeholder="Informe o e-mail"]').type(envLogin.get('emailUser'));
      cy.get('.btn').click();
    }
  }
);

When(
    'o usuário preenche o campo de usuário {string} e o campo de senha {string}',
      async (user: string, password: string) => {
        if(envLogin.has(user) && envLogin.has(password)) {
          const userInput= envLogin.get(user);
          const passwordInput = envLogin.get(password);
            if (!! userInput && !!passwordInput) {
              cy.get('input[placeholder="Informe o e-mail ou usuário"]').type(userInput);
              cy.get('input[placeholder="Informe sua senha"]').type(passwordInput);
            }
            } else {
                cy.get('input[placeholder="Informe o e-mail ou usuário"]').type(user);
                cy.get('input[placeholder="Informe sua senha"]').type(password);
            }
    }
);

When(
    'o usuário preenche o campo de usuário {string}',
      async (email: string) => {
        if(envLogin.has(email)) {
          const emailInput= envLogin.get(email);
            if (!!emailInput) {
              cy.get('input[placeholder="Informe o e-mail"]').type(emailInput);
            }
            } else {
              cy.get('input[placeholder="Informe o e-mail"]').type(email);
            }
    }
);

When(
  'o usuário preenche o {string}',
  (code: string) => {
    if(code == "código user"){
      if(envLogin.has(code)) {
          const codeInput= envLogin.get(code);
            if (!!codeInput) {
              cy.get('input[placeholder="Informe o código"]').type(codeInput);
            }
            } else {
              cy.get('input[placeholder="Informe o código"]').type(code);
            }
    }
    cy.get
  }
);



When(
  'o usuário realiza o {string}',
  () => {
    cy.get('.btn').click();
  }
);

When(
  'o usuário seleciona a opção de {string}',
  () => {
    cy.get('a:eq(0)').click();
  }
);

Then(
  'o usuário recebe uma mensagem {string}',
  (erroMessage: string) => {
    cy.get('.error-snackbar').should('be.visible');
  }
);

Then(
  'o usuário está na página {string}',
  (screen:string) => {
    if(screen == "inicial"){
      cy.url().should('include', urlHome);
    }
    if (screen == "login"){
      cy.url().should('include', urlLogin);
    }
    if (screen == "esqueci minha senha"){
      cy.url().should('include', urlRecoverPassword);
    }
    if (screen == "recuperar senha"){
      cy.get('.request-code').invoke('text').should('contain', 'Recuperar senha');
    }
      if (screen == "criar nova senha"){
      cy.get('.request-code').invoke('text').should('contain', 'Criar nova senha');;
    }
  }
);
