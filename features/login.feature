Feature: Login do usuário
    As a usuário do sistema
    I want to entrar no sistema com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

Scenario: Login administrador
    Given o usuário está na página de "login"
    And existe um usuário de CPF "00000000013" cadastrado no sistema
    When o usuário preenche o "email adm" e "senha adm" corretamente
    Then o usuário de CPF "00000000013" está na página de "administrador"

Scenario: Login com username incorreto
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário preenche o nome de usuário "error" e senha "abcdef12"
    Then o usuário recebe uma mensagem "Usuário incorreto"
    And o usuário está na página de "login"

Scenario: Login com username correto
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário preenche o "username" e "senha" corretamente
    Then o usuário de CPF "12989087064" está na página "inicial"

Scenario: Login com email incorreto
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário preenche o email "usererror@gmail.com" e senha "abcdef12"
    Then o usuário recebe uma mensagem  "Usuário incorreto"
    And o usuário está na página de "login"

Scenario: Login com email correto
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário preenche o "email user" e "senha" corretamente
    Then o usuário de CPF "12989087064" está na página "inicial"

Scenario: Login com email correto e senha incorreta
    Given o usuário está na página de "login"
    And existe um usuário de CPF "12989087064" cadastrado no sistema
    When o usuário preenche o "email user" e senha "error"
    Then o usuário recebe uma mensagem "Senha incorreta"
    And o usuário está na página de "login"Usuário

Scenario: Solicitar recuperação de senha
    Given o usuário está na página de "login"
    When o usuário seleciona a opção de "esqueci minha senha"
    Then o usuário está na página "esqueci senha" 

Scenario: Solicitar envio de código para recuperar senha com email correto
    Given o usuário está na página de "esqueci senha"
    When o usuário preenche o "email user" corretamente
    Then o usuário recebe uma mensagem "Código enviado para o email"
    And o usuário está na página "recuperar senha"
  
Scenario: Solicitar envio de código para recuperar senha com email incorreto
    Given o usuário está na página de "esqueci senha"
    When o usuário preenche o email "usererror@gmail.com" 
    Then o usuário recebe uma mensagem "Email incorreto"

Scenario: Inserção de código para recuperação de senha incorreto
    Given o usuário está na pagina de "recuperar senha"
    When o usuário preenche o "código user" corretamente
    Then o usuário está na página "criar nova senha"

Scenario: Inserção de código para recuperação de senha incorreto
    Given o usuário está na pagina de "recuperar senha"
    When o usuário preenche o "111222345"
    Then o usuário recebe uma mensagem "Còdigo inválido"
    And o usuário está na página de "recuperar senha"

Scenario: Inserção de nova senha válida
    Given o usuário está na página de "criar nova senha"
    When o usuário insere uma "nova senha user"
    Then o usuário recebe uma mensagem "Senha alterada com sucesso"
    And o usário está na página de "login"
