Feature: Cancelamento de pedidos
As a um usuário 
I want to gerenciar meus pedidos
So that eu possa cancelar meus pedidos

Scenario: Cancelar pedido logado porém sem digitar senha de confirmação.
Given o usuário de CPF  "12342153411" está na na página "histórico de pedidos"
And o pedido "143" existe no "histórico de pedidos" como "em trânsito"
When o usuário de CPF "12342153411" escolhe "cancelar o pedido" de número "143"
And o usuário de CPF "12342153411" recebe uma "requisição de senha"
And o usuário de CPF  "12342153411" "confirma o cancelamento"
Then o usuário de CPF "12342153411" recebe uma mensagem "Você precisa preencher o campo com sua senha. Tente Novamente!"
And o usuário de CPF "12342153411" continua vendo uma "requisição de senha"


Scenario: Cancelar pedido logado porém digitando senha errada
Given o usuário de CPF "12342153411" está na página "histórico de pedidos"
And o pedido "143" existe no "histórico de pedidos" como "em trânsito"
When o usuário de CPF "12342153411" escolhe "cancelar o pedido" de número "143"
And o usuário de CPF "12342153411" recebe uma "requisação de senha"
And o usuário de CPF "12342153411" preenche a senha
Then o usuário de CPF  "12342153411" recebe uma mensagem "Senha errada. Tente Novamente!"
And o usuário de CPF "12342153411" continua vendo a "requisação de senha"


Scenario: Cancelar pedido logado porém digitando senha certa
Given o usuário de CPF "12342153411" está na página "histórico de pedidos"
And o pedido "143" existe no "histórico de pedidos" como "em trânsito"
When o usuário de CPF "12342153411" escolhe cancelar o pedido "143"
And o usuário de CPF "12342153411" recebe uma "requisição de senha"
And o usuário de CPF "12342153411" preenche a senha
Then o pedido "143" aparece no "histórico de pedidos" como "cancelado"
And o usuário de CPF "12342153411" recebe uma mensagem "Pedido cancelado com sucesso!"
