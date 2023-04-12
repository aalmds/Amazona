Feature: Exibir histórico de pedidos do usuário
  As a usuário
  I want desejo visualizar todo o histórico de pedidos ativos, concluídos e cancelados, bem como ter a possibilidade de filtrá-los por nome, status, código do pedido e data.
  so that eu possa ter um maior controle sobre meus pedidos.

Scenario: Visualizar histórico de pedidos
Given que o usuário de CPF "12989087064" está na página "inicial"
And o usuário de CPF "12989087064" tem na sua conta os pedidos de número "101" e "102"
When o usuário acessa a página "histórico de pedidos"
Then  o usuário vidualiza os pedidos de número "101" e "102"

Scenario: Visualizar histórico de pedidos - Lista vazia
Given que o usuário de CPF "00342153411" está na página "inicial"
And o usuário de CPF "00342153411" não possui nenhum pedido
When o usuário de CPF "00342153411" acessa a página "histórico de pedidos"
Then o usuário de CPF "00342153411" visualiza uma mensagem "Nenhum pedido encontrado"

Scenario: Filtrar histórico de pedidos por número do pedido
Given que o usuário de CPF "12989087064" está na página "histórico de pedidos"
And o usuário de CPF "12989087064" possui o pedido de número "101"
When o usuário de CPF "12989087064" "filtra por pedido" os pedidos para o de número "101"
Then o usuário de CPF "12989087064" visualiza o pedido de número "101"  na página "histórico de pedidos"

Scenario: Filtrar histórico de pedidos por data
Given que o usuário de CPF "12989087064" está na página "histórico de pedidos"
And o usuário de CPF "12989087064" possui o pedido de número "101" criado na data "01/29/2023"
When o usuário de CPF "12989087064" "filtra por data" os pedidos para o intervalo de datas "01/29/2022" à "01/29/2024"
Then o usuário de CPF "12989087064" visualiza o pedido de número "101" na página "histórico de pedidos"

Scenario: Filtrar histórico de pedidos por múltiplos status
Given que o usuário de CPF "12989087064" está na página "histórico de pedidos"
And o usuário de CPF "12989087064" possui o pedido de número "101" como "Confirmado"
And o usuário de CPF "12989087064" possui o pedido de número "102" como "Entregue"
When o usuário de CPF "12989087064" "filtra por status" os pedidos para "Confirmado" e "Entregue"
Then o usuário de CPF "12989087064" visualiza os pedidos de número "101" e "102" no "histórico de pedidos"

Scenario: Buscar histórico de pedidos por nome do produto
Given que o usuário de CPF "12989087064" está na página "histórico de pedidos"
And o usuário de CPF "12989087064" possui o pedido de número "101" vinculado ao produto "camisa"
When o usuário de CPF "12989087064" "filtra por produto"
os pedidos para o produto "camisa"
Then o usuário de CPF "12989087064" visualiza o pedido de número "101" na página "histórico de pedidos"

Scenario: Limpar filtros
Given que o usuário de CPF "12989087064" está na página "histórico do pedido" com o "filtro por pedido" para o pedido "102"
And o usuário de CPF "12989087064" possui o "pedido" de número "101" e "102"
When o usuário de CPF "12989087064" escolher "limpar filtros"
Then o usuário de CPF "12989087064" visualiza os pedidos de número "101" e "102" na página "histórico de pedidos"

Scenario: Clicar em item de pedido
Given que o usuário de CPF "12989087064" está na página "histórico de pedidos"
And o usuário de CPF "12989087064" possui o pedido de número "101" com endereço de entrega "Rua Teste"
When o usuário de CPF "12989087064" seleciona "ver detalhes" do pedido para o pedido de número "101"
Then o usuário de CPF "12989087064" é redirecionado para a página "detalhes do pedido"
And o usuário de CPF "12989087064" visualiza o endereço de entrega "Rua Teste" do pedido de número "101"