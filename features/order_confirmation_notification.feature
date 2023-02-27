Feature: Notificação

   Os usuários teram a possibilidade de visualizar o histórico de notificações.

Scenario: Receber notificação via e-mail
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "confirmar pedido"
And que o usuário de CPF "12989087064" possua o e-mail "test@gmail.com"
And que o usuário de CPF "12989087064" esteja com o formulário "confirmar-pedido" corretamente preenchido
When o usuário de CPF "12989087064" clica em "Confirmar pedido"
Then o sistema deve enviar um e-mail de confirmação para o usuário de CPF "12989087064"
And o usuário de CPF "12989087064" deve visualizar o modal "confirmacao-pedido" com a mensagem "Pedido criado com sucesso, verifique o e-mail test@gmail.com, para mais informações!".

Scenario: Visualizar a lista de notificações de confirmação de pedido
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "home"
And que o usuário de CPF "12989087064" tem na sua conta as notificações de id "101" e "102"
When o usuário de CPF "12989087064" clica em "Ver notificações"
Then o menu flutuante "menu-notificacoes" das notificações é aberto
And o usuário de CPF "12989087064" visualiza as notificações de id "101" e "102".

Scenario: Visualizar a lista de notificações de confirmação de pedido - Vazia
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "home"
And que o usuário de CPF "12989087064" não possui notificações na sua conta
When o usuário de CPF "12989087064" clica em "Ver notificações"
Then o menu flutuante "menu-notificacoes" das notificações é aberto
And o usuário de CPF "12989087064" deve visualizar a mensagem "Nenhuma notificação encontrada".

Scenario: Clicar em item de notificação leva ao pedido
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "home"
And que o usuário de CPF "12989087064" possui a notificação de id "101" que é referente ao pedido de número "101" que tem endereço de entrega "Rua Teste"
When o usuário de CPF "12989087064" clica em "Ver notificações"
Then o menu flutuante "menu-notificacoes" das notificações é aberto
And o usuário de CPF "12989087064" deve visualizar a notificação de id "101"
When o usuário de CPF "12989087064" clica em na notificação de id "101"
Then o usuário de CPF "12989087064" é rediecionado para a página "detalhes do pedido"
And o usuário de CPF "12989087064" consegue visualizar o endereço de entrega com o valor "Rua Teste" do pedido de número "101" 
