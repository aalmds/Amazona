Feature: Estatísticas
    
    As an usuário administrador 
    I want to ser capaz de ver os dados sobre os pedidos ao longo do tempo e quero ser capaz de filtra-los pelo período, pelo status (se foi cancelado ou não) e por pedido.
    So that eu possa ver estatísticas relacionadas às compras que foram canceladas

    Scenario: Ver estatÍstica geral
        Given que o usuário com CPF “00000000013” está na página de administrador
        And as métricas do valores das compras (no tempo) são respectivamente "15000", "20000" e "10000"
        Then os valores  "15000", "20000" e "10000" que são, respectivamente, as métricas do valor das compras (no tempo) são mostrados

    Scenario: Ver estatística por pedido
        Given que o usuário com CPF “00000000013” está na página de "administrador"
        And as métricas do valores das compras (por pedido) são respectivamente "150", "200" e "100"
        When  o usuário de CPF "00000000013" acessa os "dados por pedido"
        Then os valores "150", "200" e "100" que são, respectivamente, as métricas dos valores das compras em cada pedidos são mostrados

    Scenario: Ver estatística dos cancelados
        Given que o usuário com CPF “00000000013” está na página de administrador
        And as métricas do valores das compras canceladas (por pedido) são respectivamente "150", "200" e "100"
        When o usuário  de CPF "00000000013" acessa as dados para "pedidos cancelados"
        Then os valores "150", "200" e "100" que são, respectivamente, as métricas dos valores das compras canceladas por pedido são mostrados

    Scenario: Selecionar período
        Given que o usuário com CPF “00000000013” está na página de "administrador"
        When o usuário de CPF "00000000013" seleciona o período "mês"
        And o usuário de CPF "00000000013"  acessa os "dados por pedido"
        Then os valores "150", "200" e "100" que são, respectivamente, as métricas dos valores das compras em cada pedidos no mês atual são mostrados       
        And o período selecionado é "mês"
