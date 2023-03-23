Feature: Notificação
  As a usuário
  I want desejo visualizar o histórico de notificações
  so that eu possa saber quando meu novo pedido foi aceito

Scenario: Receber notificação via e-mail
Given que o usuário de CPF "12989087064" está na página "finalização de pedido"
When o usuário de CPF "12989087064" escolhe "confirmar pedido"
Then o sistema envia um "e-mail de confirmação" para o usuário de CPF "12989087064"
And o usuário de CPF "12989087064" recebe uma mensagem "Pedido criado com sucesso, verifique seu e-mail para mais informações!".

Scenario: Visualizar a lista de notificações de confirmação de pedido
Given que o usuário de CPF "12989087064" está na página "inicial"
And que o usuário de CPF "12989087064" tem na sua conta as notificações de número "101" e "102"
When o usuário de CPF "12989087064" escolhe ver "suas notificações"
Then o usuário de CPF "12989087064" visualiza as notificações de número "101" e "102".

Scenario: Visualizar a lista de notificações de confirmação de pedido - Vazia
Given que o usuário de CPF "12342153411" está na página "inicial"
And o usuário de CPF "12342153411" não possui notificações na sua conta
When o usuário de CPF "12342153411" escolhe ver "suas notificações"
Then o usuário de CPF "12342153411" visualiza uma mensagem "Nenhuma notificação encontrada".

Scenario: Clicar em item de notificação leva ao pedido
Given que o usuário de CPF "12989087064" está na página "inicial"
And o usuário de CPF "12989087064" possui a notificação de número "101", associada ao pedido de número "101" com endereço de entrega "Rua Teste"
When o usuário de CPF "12989087064" seleciona ver "suas notificações"
And o usuário de CPF "12989087064" seleciona a notificação de número "101"
Then o usuário de CPF "12989087064" é rediecionado para a página "detalhes do pedido"
And o usuário de CPF "12989087064" visualiza o endereço de entrega "Rua Teste" do pedido de número "101" 
