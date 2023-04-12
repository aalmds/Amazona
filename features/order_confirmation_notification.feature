Feature: Notificação
  As a usuário
  I want desejo visualizar o histórico de notificações
  so that eu possa saber quando meu novo pedido foi aceito

  Scenario: Pedido criado com sucesso
    Given que o usuário de CPF "12989087064" está na página "finalização de pedido"
    When o usuário de CPF "12989087064" escolhe "confirmar pedido"
    Then o usuário de CPF "12989087064" recebe uma mensagem "Pedido realizado com sucesso!"

  Scenario: Visualizar a lista de notificações de confirmação de pedido
    Given que o usuário de CPF "12989087064" está na página "inicial"
    When o usuário de CPF "12989087064" escolhe ver "suas notificações"
    Then o usuário de CPF "12989087064" visualiza as notificações de número "101" e "102"