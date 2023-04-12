import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const page:{ [key: string]: string } = {
  'finalização de pedido' : "shopping-cart/create-order",
  'inicial' : ''
};

const buttonLabel: {[key: string]: string}={
  "confirmar pedido": "FINALIZAR PEDIDO",

};

beforeEach(() => {
  cy.visit('http://localhost:4200/authentication/sign-in');
  cy.get('#mat-input-0').type('acrucha');
  cy.get('#mat-input-1').type('abcdef12');
  cy.get('button.btn.large').click();
  cy.scrollTo('bottom');
  cy.get('img[alt="Nome do produto"]').click();
  cy.get('button.btn.large').click();
  ;

});

Given('que o usuário de CPF {string} está na página {string}', (cpf, pageUrl) => {
  cy.visit(`http://localhost:4200/${page[pageUrl]}`);
});

When('o usuário de CPF {string} escolhe {string}', (cpf, buttonLabel) => {
  cy.get('button.btn.large').click();
  
});

When('o usuário de CPF {string} escolhe ver {string}', (cpf, opcao) => {
  cy.get('button.mat-mdc-menu-trigger').click(); // clica no botão de notificações
  cy.contains('span.medium-text', 'Clique para ver mais detalhes').click(); // clica no link "Clique para ver mais detalhes"
  cy.get('body').click(0, 0); // clica fora do menu, no fundo da página
});


Then('o usuário de CPF {string} recebe uma mensagem {string}', (cpf, message) => {

  cy.get('.mdc-snackbar .mat-mdc-snack-bar-label').first().invoke('text').then((messageText) => {
    expect(messageText.trim()).to.equal(message + "\n Fechar");
  })});

  Then('o usuário de CPF {string} visualiza as notificações de número {string} e {string}', () => {
  
    // Verifica se a página foi carregada corretamente
    cy.contains(`Pedido Nº #123314`);
  });