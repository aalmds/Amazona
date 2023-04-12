import {
  Given,
  And,
  When,
  Then,
  Before,
} from 'cypress-cucumber-preprocessor/steps';

const mockUser = {
  id: 'ce6f5c66-1967-4b21-9929-51ca7d652151',
  CPF: '12989087064',
  name: 'Clara Acrucha',
  username: 'acrucha',
  email: 'mvsm3@mail.com',
  password: 'abcdef12',
  payment: 'PIX',
  address: [],
  phone: '999789923',
  code: '',
};

const mockProducts = [
  {
    id: '1',
    name: 'Camisa Puma - masculino',
    brand: {
      id: '1',
      name: 'Puma',
    },
    value: '100',
  },
  {
    id: '2',
    name: 'Camisa Adidas - masculino',
    brand: {
      id: '2',
      name: 'Adidas',
    },
    value: '100',
  },
];

Before(() => {
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify(mockUser));
  });
});

// Scenario: Carrinho de compras vazio
Given(
  'que o usuário de CPF {string} está na página {string}',
  (cpf: string, page: string) => {
    cy.visit('/shopping-cart/cart');
  }
);

And('o carrinho de compras está vazio', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('cart');
  });
});

When(
  'o usuário de CPF {string} acessa a página {string} CarrinhoVazio',
  (cpf: string, page: string) => {}
);

Then(
  'o usuário de CPF {string} visualiza a mensagem {string} com a opção de {string}',
  (cpf: string, message: string, option: string) => {
    cy.get('.container h1').contains(message);

    cy.get('app-button button').contains(option);
  }
);

And('a opção de {string} não é exibida na página', (option: string) => {
  cy.get('app-button button').contains(option).should('not.exist');
});

// Scenario: Carrinho de compras abandonado
Given(
  'que o usuário de CPF {string} está na página {string} com os itens {string} e {string} adicionados',
  (cpf: string, page: string, item1: string, item2: string) => {
    cy.window().then((win) => {
      win.localStorage.setItem('cart', JSON.stringify(mockProducts));
    });

    cy.visit('/shopping-cart/cart');
  }
);

When('o usuário de CPF {string} sai do site', (cpf: string) => {
  cy.visit('/');
});

And(
  'o usuário de CPF {string} acessa a página {string} CarrinhoAbandonado',
  (cpf: string, page: string) => {
    cy.visit('/shopping-cart/cart');
  }
);

Then(
  'o usuário de CPF {string} visualiza os itens {string}, {string} e a opção de {string}',
  (cpf: string, item1: string, item2: string, option: string) => {
    cy.get('app-cart-product-item').should('have.length', 2);
    cy.get('app-button button').contains(option).should('exist');
  }
);

// Scenario: Finalização de pedido sem endereço cadastrado
Given(
  'que o usuário com CPF {string} está na página {string} com os itens {string} e {string} adicionados',
  () => {
    cy.window().then((win) => {
      win.localStorage.setItem('cart', JSON.stringify(mockProducts));
    });

    cy.visit('/shopping-cart/cart');
  }
);

And(
  'o usuário de CPF {string} não tem endereços cadastrados',
  (cpf: string) => {}
);

When(
  'o usuário de CPF {string} seleciona {string}',
  (cpf: string, option: string) => {
    cy.get('app-button button').contains('CONTINUAR').click();
  }
);

Then(
  'o usuário de CPF {string} é redirecionado para a página {string}',
  (cpf: string, page: string) => {
    cy.url().should('include', '/shopping-cart/create-order');
  }
);

And(
  'o usuário de CPF {string} escolhe {string}',
  (cpf: string, option: string) => {
    cy.get('app-button button').contains('FINALIZAR PEDIDO').click();
  }
);

Then(
  'o usuário de CPF {string} recebe uma mensagem {string}',
  (cpf: string, message: string) => {
    cy.get('.mdc-snackbar .mat-mdc-snack-bar-label')
      .invoke('text')
      .then((messageText) => {
        expect(messageText).to.include(message);
      });
  }
);

// Scenario: Finalização de pedido
Given(
  'que o usuário com CPF {string} está na página {string} com os itens {string} e {string} adicionados',
  () => {
    cy.window().then((win) => {
      win.localStorage.setItem('cart', JSON.stringify(mockProducts));
    });

    cy.visit('/shopping-cart/cart');
  }
);

And(
  'o usuário de CPF {string} não tem endereço FinalizaçãoPedido',
  (cpf: string) => {}
);

When(
  'o usuário de CPF {string} seleciona {string}',
  (cpf: string, option: string) => {
    cy.get('app-button button').contains(option).click();
  }
);

Then(
  'o usuário de CPF {string} é redirecionado para a página {string}',
  (cpf: string, page: string) => {}
);

When(
  'o usuário de CPF {string} preenche as informações de {string}',
  (cpf: string, option: string) => {
    cy.visit('/profile');
    cy.get('.step .section-title').contains('Endereço').click();

    cy.get('.main-address input').type('Rua de Test');
    cy.get('app-button button').contains('SALVAR').click();

    cy.window()
      .then((win) => {
        win.localStorage.setItem(
          'user',
          JSON.stringify({
            ...mockUser,
            address: ['Rua de test'],
          })
        );
      })
      .wait(1000);

    cy.visit('/shopping-cart/create-order');
  }
);

And(
  'o usuário de CPF {string} escolhe {string}',
  (cpf: string, option: string) => {
    cy.get('app-button button').contains(option).click();
  }
);

Then(
  'o usuário de CPF {string} recebe a mensagem {string}',
  (cpf: string, message: string) => {
    cy.get('.mdc-snackbar .mat-mdc-snack-bar-label')
      .invoke('text')
      .then((messageText) => {
        expect(messageText).to.include(message);
      });
  }
);

And(
  'o usuário de CPF {string} é redirecionado para a página {string} FinalizaçãoPedido',
  (cpf: string, page: string) => {
    cy.url().should('include', '/order/history');
  }
);
