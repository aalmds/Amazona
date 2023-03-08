Feature: Exibir histórico de pedidos do usuário

  Os usuários poderão visualizar todo o histórico de pedidos ativos, concluídos e cancelados. Além da possibilidade de filtrá-los por nome, status, código do pedido e  data.

Scenario: Visualizar histórico de pedidos
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "home"
And que o usuário de CPF "12989087064" tem na sua conta os pedidos de número "101" e "102"
When o usuário acessa a página de "histórico de pedidos"
Then o sistema deve retornar uma lista com os pedidos de número "101" e "102"
And o usuário deve visualizar os pedidos de número "101" e "102" na listagem da página "histórico de pedidos"

Scenario: Visualizar histórico de pedidos - Lista vazia
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "home"
And que o usuário de CPF "12989087064" não possua nenhum pedido
When o usuário de CPF "12989087064" acessa a página de histórico de pedidos
Then o sistema deve retorna uma lista vazia
And o usuário de CPF "12989087064" deve visualizar a mensagem "Nenhum pedido encontrado"

Scenario: Filtrar histórico de pedidos por número do pedido
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "histórico de pedidos"
And que o usuário de CPF "12989087064" possua o pedido de número "101"
When o usuário de CPF "12989087064" seleciona a opção de filtrar por número do pedido
And insere "101" como número do pedido
Then o sistema deve retorna apenas o pedido de número "101"
And o usuário de CPF "12989087064" deve visualizar o pedido de número "101" na listagem da página "histórico de pedidos"

Scenario: Filtrar histórico de pedidos por data
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "histórico de pedidos"
And que o usuário de CPF "12989087064" possua o pedido de número "101" que foi criado na data "14/01/2022"
When o usuário de CPF "12989087064"seleciona a opção de filtrar por data
And escolhe o intervalo de "12/01/2022" a "16/01/2022"
Then o sistema deve retornar apenas os pedidos do usuário de CPF "12989087064" que foram criados dentro do intervalo de datas "12/01/2022" a "16/01/2022"
And o usuário de CPF "12989087064" deve visualizar o pedido de número "101" na listagem da página "histórico de pedidos"

Scenario: Filtrar histórico de pedidos por múltiplos status
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "histórico de pedidos"
And que o usuário de CPF "12989087064" possua o pedido de número "101" com o status "ativo"
And que o usuário de CPF "12989087064" possua o pedido de número "102" com o status "cancelado"
When o usuário de CPF "12989087064" escolhe a opção de filtrar por status
And seleciona os status "ativo" e "cancelado"
Then o sistema deve retornar apenas os pedidos do usuário de CPF "12989087064" que possuam os status "ativo" e "cancelado"
And o usuário de CPF "12989087064" deve visualizar os pedidos de número "101" e "102" na listagem da página "histórico de pedidos"

Scenario: Buscar histórico de pedidos por nome do produto
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "histórico de pedidos"
And que o usuário de CPF "12989087064" possua o pedido de número "101" que possui o produto com nome "camisa"
When o usuário de CPF "12989087064" seleciona a opção de filtrar por nome do produto
And informar o nome do produto "camisa" 
Then o sistema deve retornar apenas os pedidos do usuário de CPF "12989087064" que possuam um produdo com o nome "camisa"
And o usuário de CPF "12989087064" deve visualizar o pedido de número "101" na listagem da página "histórico de pedidos"

Scenario: Limpar filtros
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "histórico de pedidos"
And que o usuário de CPF "12989087064" possua o pedido de número "101" e "102"
And que o usuário de CPF "12989087064" aplicou o filtro de filtrar por número do pedido com o valor "102"
And que o usuário de CPF "12989087064" esteja apenas visualizando o pedido de número "102" na listagem da página "histórico de pedidos"
When o usuário de CPF "12989087064" clica em "Limpar filtros"
Then o campo com o número de pedido "102" é limpo
And o usuário de CPF "12989087064" deve visualizar os pedidos de número "101" e "102" na listagem da página "histórico de pedidos"

Scenario: Clicar em item de pedido
Given que o usuário de CPF "12989087064" esteja logado no sistema na página "histórico de pedidos"
And que o usuário de CPF "12989087064" possua o pedido de número "101" que tem endereço de entrega "Rua Teste"
And que o usuário de CPF "12989087064" visualiza o pedido de número "101" na listagem da página "histórico de pedidos"
When o usuário de CPF "12989087064" clica na opção "Ver detalhes" do card do pedido de número "101"
Then o usuário de CPF "12989087064" é redirecionado para a página "detalhes do pedido"
And o usuário de CPF "12989087064" consegue visualizar o endereço de entrega com o valor "Rua Teste" do pedido de número "101"


