Feature: Calculo do tempo estimado de entrega

  Scenario: Ver tempo estimado de entrega de um pedido
    Given o usuário de CPF "12989087064" está na página "histórico de pedidos"
    And o pedido “1244” está em trânsito
    When o usuário de CPF "1298908706" seleciona a opçâo acompanhar o pedido de número "1244"
    Then o usuário é redirecionado para a página "acompanhamento do pedido"
    And o usuário consegue ver o tempo estimado de entrega

  Scenario: Tempo estimado de entrega após recebimento do pedido
    Given o usuário de CPF "1298908706" está na página "histórico de pedidos"
    And o pedido “1222” já foi entregue ao destinatário
    When o usuário de CPF "1298908706" seleciona a opçâo acompanhar o pedido “1222”
    Then o usuário é redirecionado para a página "acompanhamento do pedido"
    And o usuário consegue ver a mensagem “pedido entregue”

  Scenario: Tempo estimado de entrega após cancelamento do pedido
    Given o usuário de CPF "1298908706" está na página "histórico de pedidos"
    And o pedido “1233” foi cancelado
    When o usuário de CPF "1298908706" seleciona a opçâo acompanhar o pedido “1233”
    Then o usuário é redirecionado para a página "acompanhamento do pedido"
    And o usuário consegue ver a mensagem “pedido cancelado”
