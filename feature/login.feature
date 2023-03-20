Feature: Login do usuário
    As a usuário do sistema
    I want to entrar no sistema com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

Scenario: Login correto
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário preenche o "email" e "senha" corretamente
    Then o usuário de CPF "12989087064" é encaminhado para a página "inicial"

Scenario: Login admin
    Given o usuário está na página de "login"
    And existe um usuário de CPF "00000000013" cadastrado no sistema
    When o usuário preenche o "email" e "senha" corretamente
    Then o usuário de CPF "00000000013" é encaminhado para a pagina de "administrador"

Scenario: Login incorreto
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário tenta fazer login com o email "usererror@gmail.com" e senha "1234567a"
    Then o usuário recebe uma mensagem  "Credenciais incorretas."
    And o usuário continua na página de "login"

Scenario: Esqueceu a senha
    Given o usuário está na página de "login"
    When o usuário seleciona a opção de esqueceu a senha
    Then o usuário é encaminhado para a pagina de "esqueci a senha" 

Scenario: Recuperar a senha correta
    Given o usuário está na página de "esqueci a senha"
    When o usuário preenche o "email" corretamente
    And recebe uma mensagem "Código enviado para o email"
    Then é encaminhado para a página de "recuperar a senha"
  
Scenario: Recuperar a senha incorreta
    Given o usuário está na página de "esqueci a senha"
    When o usuário preenche o email "usererror@gmail.com" 
    Then recebe uma mensagem "Email inválido"

Scenario: Mudando a senha correta
    Given o usuário está na pagina de "recuperar a senha"
    When o usuário preenche o "código" corretamente
    Then o usuário recebe uma mensagem "digite uma nova senha"
    And é encaminhado para a página inicial

Scenario: Mudando a senha incorreta
    Given o usuário está na pagina de "recuperar a senha"
    When o usuário preenche o código "12345678"
    Then o usuário recebe uma mensagem "código inválido"
    And continua na página de "recuperar a senha"