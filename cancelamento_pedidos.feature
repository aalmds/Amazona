Cenário de GUI


Feature: Cancelamento de pedidos
In order to Eu possa gerenciar melhor meus pedidos
As an Usuário/Cliente
Eu preciso poder cancelar meus pedidos


Scenario: Cancelar pedido logado porém sem digitar senha de confirmação.
Given Eu estou na página “Histórico de pedidos” logado como usuário de cpf “12342153411” 
And o pedido "143" existe no “Histórico de pedidos”
When Eu escolho cancelar o pedido “143”
And eu solicito o cancelamento
Then aparece a mensagem de erro “Você precisa preencher o campo com sua senha. Tente Novamente!”
And a senha é requisitada


Scenario: Cancelar pedido logado porém digitando senha errada
Given Eu estou na página “Histórico de pedidos” logado como usuário de cpf “12342153411”
And o pedido "143" existe no “Histórico de pedidos”
When Eu escolho cancelar o pedido “143”
And preencho com a senha “123456” e solicito o cancelamento
Then aparece a mensagem de erro “Senha errada. Tente Novamente!”
And a senha é requisitada


Scenario: Cancelar pedido logado porém digitando senha certa
Given Eu estou na página “Histórico de pedidos” logado como usuário de cpf “12342153411”
And o pedido "143" existe no “Histórico de pedidos”
When Eu escolho cancelar o pedido “143”
And preencho com a senha "456123” e solicito o cancelamento
Then o pedido “143”  aparecerá no "Histórico de pedidos" com status "cancelado
And Aparece a mensagem de confirmação “Pedido "143" foi cancelado com sucesso”
