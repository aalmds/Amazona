Feature: Login no aplicativo
    As a usuario do aplicativo
    I want to entrar no aplicativo com meu e-mail e senha cadastrado
    So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

Scenario: Login correto
    Given o cliente está na página de "login"
        And existe um usuario cadastrado com o email "acruchi@gmail.com" e senha "123456"
        And estou na página inicial de "login"
    When eu preencho o campo email do aplicatico com o email "acruchi@gmail.com" e o campo de senha com a senha "123456"
    Then o cliente é encaminhado para a tela inicial do aplicativo

Scenario: Login admin
    Given o admin não está logado com nenhum usuário na aplicação
        And existe um admin cadastrado com o email "admin@gmail.com" e senha "admin"
        And estou na página inicial de "login"
    When eu tento acessar o aplicatico com o email"admin@gmail.com"
        And com a senha "admin"
    Then o admin é encaminhado para a pagina do administrador

Scenario: Login com a senha errada
    Given Não estou logado com nenhum usuário na aplicação
        And existe um usuario cadastrado com o email "acruchi@gmail.com" e senha "123456"
        And estou na página de "login"
    When eu tento acessar o aplicatico com o email "acruchi@gmail.com"
        And o campo da senha é preenchido por "1234"
    Then eu recebo uma mensagem de erro dizendo que a senha ou usuario está errada
        And eu continuo na página de login

Scenario: Login com a email errado
    Given Não estou logado com nenhum usuário na aplicação           
        And estou na página de "login"
    When eu tento acessar o aplicatico com o email "test@gmail.com"
        And o campo da senha é preenchido por "123456"
    Then eu recebo uma mensagem de erro dizendo que a senha ou usuario está errada
        And eu continuo na página de login


Scenario: Esqueceu a senha e preenche o campo de recuperar com o código certo
    Given o usuario "acruchi" não está logado  na aplicação
        And está na página de "login"
    When o usuario "acruchi" seleciona a opção de Esqueceu a senha
    Then o usuario "acruchi" é encaminhado para uma pagina de esqueci a senha
        And preenche o campo de email ou usuario com o email "acruchi@gmail.com"
        And seleciona recuperar a senha 
    Then o usuario "acruchi" é encaminhado para a pagina de recuperar a senha
        And o usuario "acruchi" recebe o código "3245" é válido para ele
    When o usuario "acruchi" preenche o campo do código com o código "3245"
     Then uma nova senha é requisitada
        And o usuario "acruchi" escolhe uma nova senha "234567"
    Then é encaminhado para a pagina de login 

Scenario: Esqueceu a senha e preenche o campo de recuperar com o código errado
    Given o usuario "acruchi" não está logado  na aplicação
        And está na página de "login"
    When o usuario "acruchi" seleciona a opção de Esqueceu a senha
    Then o usuario "acruchi" é encaminhado para uma pagina de esqueci a senha
        And preenche o campo de email ou usuario com o email "acruchi@gmail.com"
        And seleciona recuperar a senha 
    Then o usuario "acruchi" é encaminhado para a pagina de recuperar a senha
        And o usuario "acruchi" recebe o código "3245" é válido para ele
    When o usuario "acruchi" preenche o campo do código com o código "3333"
    Then o usuario "acruchi" recebe uma mensagem de erro dizendo que o codigo esta errado 
        And continua na pagina de recuperar a senha 

