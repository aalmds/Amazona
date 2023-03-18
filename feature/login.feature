Feature: Login no aplicativo
    As a usuário do aplicativo
    I want to entrar no aplicativo com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

Scenario: Login correto
    Given o usuário está na página de "login"
    And existe um usuário cadastrado
    When o usuário preenche os campos de cpf e senha corretamente
    Then o usuário é encaminhado para a tela inicial

Scenario: Login admin
    Given o usuário está na página de "login"
    And existe um usuário cadastrado
    When o usuário preenche os campos de cpf e senha com as credenciais de administrador corretamente
    Then o admin é encaminhado para a pagina do administrador

Scenario: Login incorreto
    Given o usuário está na página de "login"
    And existe um usuário cadastrado
    When eu tento acessar o aplicatico com o cpf "11111111111"
    And o campo da senha é preenchido por "123456"
    Then eu recebo uma mensagem  "Credenciais incorretas"
    And eu continuo na página de login


Scenario: Esqueceu a senha e preenche o campo de recuperar com o código certo
    Given o usuário "acruchi" está na página de "login"
    When o usuário "acruchi" seleciona a opção de Esqueceu a senha
    Then o usuário "acruchi" é encaminhado para uma pagina de esqueci a senha
    And preenche o campo de cpf
    And seleciona recuperar a senha 
    Then o usuário "acruchi" é encaminhado para a pagina de recuperar a senha
    And o usuário "acruchi" recebe o código
    When o usuário "acruchi" preenche o campo do código com o código correto
    Then o usuário "acruchi" recebe uma mensagem "digite uma nova senha"
    And o usuário "acruchi" digita uma nova senha
    Then é encaminhado para a pagina de login 

Scenario: Esqueceu a senha e preenche o campo de recuperar com o código errado
    Given o usuário "acruchi" não está logado  na aplicação
    And está na página de "login"
    When o usuário "acruchi" seleciona a opção de Esqueceu a senha
    Then o usuário "acruchi" é encaminhado para uma pagina de esqueci a senha
    And preenche o campo de cpf
    And seleciona recuperar a senha 
    Then o usuário "acruchi" é encaminhado para a pagina de recuperar a senha
    And o usuário "acruchi" recebe o código
    When o usuário "acruchi" preenche o campo do código com o código "3333"
    Then o usuário "acruchi" recebe uma mensagem "Código errado"
    And continua na pagina de recuperar a senha 

