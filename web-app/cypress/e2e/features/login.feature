Feature: Login do usuário
    As a usuário do sistema
    I want to entrar no sistema com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

  Scenario: Login com email correto
    Given o usuário está na página de "login"
    When o usuário preenche o campo de usuário "emailUser" e o campo de senha "password"
    And o usuário realiza o "login"
    Then o usuário está na página "inicial"

  Scenario: Login com username correto
    Given o usuário está na página de "login"
    When o usuário preenche o campo de usuário "user" e o campo de senha "password"
    And o usuário realiza o "login"
    Then o usuário está na página "inicial"

  Scenario: Login com email incorreto
    Given o usuário está na página de "login"
    When o usuário preenche o campo de usuário "usererror@gmail.com" e o campo de senha "password"
    And o usuário realiza o "login"
    Then o usuário recebe uma mensagem "Usuário ou senha incorretos"
    And o usuário está na página de "login"

  Scenario: Login com username incorreto
    Given o usuário está na página de "login"
    When o usuário preenche o campo de usuário "erro" e o campo de senha "password"
    And o usuário realiza o "login"
    Then o usuário recebe uma mensagem "Usuário ou senha incorretos"
    And o usuário está na página de "login"

  Scenario: Login com email correto e senha incorreta
    Given o usuário está na página de "login"
    When o usuário preenche o campo de usuário "emailUser" e o campo de senha "1234587k"
    And o usuário realiza o "login"
    Then o usuário recebe uma mensagem "Usuário ou senha incorretos"
    And o usuário está na página de "login"

  Scenario: Login com username correto e senha incorreta
    Given o usuário está na página de "login"
    When o usuário preenche o campo de usuário "user" e o campo de senha "1234587k"
    And o usuário realiza o "login"
    Then o usuário recebe uma mensagem "Usuário ou senha incorretos"
    And o usuário está na página de "login"

  Scenario: Solicitar recuperação de senha
    Given o usuário está na página de "login"
    When o usuário seleciona a opção de "esqueci minha senha"
    Then o usuário está na página "esqueci senha"

  Scenario: Solicitar envio de código para recuperar senha com email correto
    Given o usuário está na página de "esqueci senha"
    When o usuário preenche o campo de usuário "emailUser"
    And o usuário realiza o "envio do email"
    And o usuário está na página "recuperar senha"

  Scenario: Solicitar envio de código para recuperar senha com email incorreto
    Given o usuário está na página de "esqueci senha"
    When o usuário preenche o campo de usuário "usererror@gmail.com"
    And o usuário realiza o "envio do email"
    Then o usuário recebe uma mensagem "Usuário não encontrado"
