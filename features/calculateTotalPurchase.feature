Feature: Estatísticas

    Scenario: Ver estatÍstica geral
        Given que o usuário com CPF “00000000013” é o administrador
        And o usuário está na página de administrador
        And A média, o máximo e o mínimo do valores das compras (no tempo) são respectivamente "15000", "20000" e "10000"
        Then os valores  "15000", "20000" e "10000" que são, respectivamente, a média, o máximo e o mínimo do valor das compras (no tempo) são mostrados

    Scenario: Ver estatística por pedido
        Given que o usuário com CPF “00000000013” está na página de "administrador"

        And A média, o máximo e o mínimo do valores das compras (por pedido) são respectivamente "150", "200" e "100"
        When  o usuário de CPF "00000000013" acessa os "dados por pedido"
        Then os valores "150", "200" e "100" que são, respectivamente, a média, o máximo e o mínimo dos valores das compras em cada pedidos são mostrados

    Scenario: Ver estatística dos cancelados
        Given que o usuário com CPF “00000000013” é o administrador
        And o usuário está na página de administrador
        And A média, o máximo e o mínimo do valores das compras canceladas (por pedido) são respectivamente "150", "200" e "100"
        When  O usuário acessa a aba de dados para pedidos cancelados (ID 131)
        Then os valores "150", "200" e "100" que são, respectivamente, a média, o máximo e o mínimo dos valores das compras canceladas por pedido são mostrados

    Scenario: Selecionar período
        Given que o usuário com CPF “00000000013” é o administrador
        And o usuário está na página de administrador
        When  O usuário seleciono o período  "MÊS"
        And O usuário acessa a aba de dados por pedido (ID 132)
        Then os valores "150", "200" e "100" que são, respectivamente, a média, o máximo e o mínimo dos valores das compras em cada pedidos no mês atual são mostrados