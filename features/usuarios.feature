Feature: Cadastro e manuntenção de usuários

As a usuário
I want to conseguir me cadastrar no sistema
So that eu possa atualizar e deletar minhas informações
 
Scenario: Cadastro com CPF já utilizado
Given que o usuário de CPF "129890870640" está cadastrado no sistema
And o usuário está na página de "cadastro"
When o usuário tenta cadastrar o nome "Clara Acrucha", CPF "12989087064", email "acrucha@mail.com", senha "abcdef12" e método de pagamento "PIX"
Then o usuário recebe uma mensagem de aviso "Usuário já cadastrado."

Scenario: Cadastro com username já utilizado
Given que o nome de usuário "rafinha" está cadastrado cadastrado no sistema
And o usuário está na página de "cadastro"
When o usuário tenta cadastrar o nome "Rafinha dos Reis", CPF "12342153411", email "rafinha@mail.com", senha "1234567a", método de pagamento "PIX" e nome de usuário "rafinha"
Then o usuário recebe uma mensagem de aviso "Usuário já cadastrado."

Scenario: Cadastro com email já utilizado
Given que o email "acrucha@mail.com" está cadastrado no sistema
And o usuário está na página de "cadastro" 
When o usuário tenta cadastrar o nome "Clara Acrucha", CPF "12989087064", email "acrucha@mail.com", senha "abcdef12" e método de pagamento "PIX"
Then o usuário recebe uma mensagem de aviso "Email já cadastrado."

Scenario: Cadastro com senha inválida
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro"
When o usuário tenta cadastrar o nome "Malu Santos", CPF "00100200304", email "malu@mail.com", senha "000" e método de pagamento "PIX"
Then o usuário recebe uma mensagem de aviso "Formato de senha inválido. Por favor, siga as recomendações e tente novamente. "

Scenario: Cadastro com email inválido 
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro" 
When o usuário tenta cadastrar o nome "Malu Santos", CPF "00100200304", email "mail", senha "000111ab" e método de pagamento "PIX"
Then o usuário recebe uma mensagem de aviso "Formato de email inválido. Por favor, siga as recomendações e tente novamente."

Scenario: Cadastro sem inserção do método de pagamento
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro" 
When o usuário tenta cadastrar o nome "Malu Andrade" com CPF "00100200304" e email "malu@mail.com" com senha "000111ab"
Then o usuário "Alana Silva" recebe uma mensagem de aviso "Por favor, preencha todos os dados obrigatórios e tente novamente."

Scenario: Cadastro com dados obrigatórios corretos
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro" 
When o usuário tenta cadastrar o nome "Malu Andrade", CPF "00100200304", email "malu@mail.com", senha "000111ab" e método de pagamento "PIX"
Then o usuário de CPF "00100200304" é cadastrado no sistema
And o usuário de CPF "00100200304" recebe uma mensagem de aviso "Cadastro realizado com sucesso."
And o usuário de CPF "00100200304" é redirecionado para a página de "login"

Scenario: Cadastro com dados obrigatórios e não obrigatórios corretos
Given que o CPF "11022033040" não está cadastrado no sistema
And o usuário está na página de "cadastro" 
When o usuário tenta cadastrar o nome "Mavi Muniz", CPF "11022033040", email "mavi@mail.com", senha "1111000a", método de pagamento "PIX", nome de usuário "mavi", número de celular "81999223344" e endereço "Avenida Mavi 5"
Then o usuário de CPF "11022033040" é cadastrado no sistema
And o usuário de CPF "11022033040" recebe uma mensagem de aviso "Cadastro realizado com sucesso."
And o usuário de CPF "11022033040" é redirecionado para a página de "login"

Scenario: Tentativa de remoção de conta com inserção de senha incorreta 
Given que o usuário de CPF "11022033040" está na página de "deletar conta"
When o usuário de CPF "11022033040" tenta "deletar" sua conta 
And o usuário de CPF "11022033040" recebe uma mensagem de aviso "Por favor, insira a sua senha."
And o usuário de CPF "11022033040" insere a senha "deletar"
Then o usuário de CPF "11022033040" recebe uma mensagem de aviso "Senha incorreta, por favor, tente novamente."

Scenario: Remoção de conta com inserção de senha correta 
Given que o usuário de CPF "11022033040" está na página de "deletar conta"
When o usuário de CPF "11022033040" tenta "deletar" sua conta 
And o usuário de CPF "11022033040" recebe uma mensagem de aviso "Por favor, insira a sua senha."
And o usuário de CPF "11022033040" insere a senha corretamente
Then o usuário de CPF "11022033040" é removido do sistema 
And o usuário é redirecionado para a página de "login"

Scenario: Atualização de nome 
Given que o usuário de CPF "00100200304" está na página de "dadodes pessoais"
When o usuário de CPF "00100200304" tenta editar seus "nome" 
And o usuário de CPF "00100200304" "atualiza o nome" para "Maluzinha"
Then o nome do usuário de CPF "00100200304" é atualizado para "Maluzinha"
And o usuário de CPF "00100200304" com nome "Maluzinha" está na página de "perfil" atualizada

Scenario: Adição de endereço 
Given que o usuário de CPF "129890870640" está na página de "endereço"
When o usuário "Clara Acrucha" escolhe "adicionar endereço" e "salva" um endereço "Avenida Acruchinha 1"
Then um novo endereço "Avenida Acruchinha 1" é adicionado ao usuário de CPF "129890870640"
And o usuário de CPF "129890870640" está na página de "endereços" atualizada

Scenario: Remoção de endereço 
Given que o usuário de CPF "129890870640" está na página de "endereços"
When o usuário de CPF "129890870640" escolhe "deletar o endereço" "Avenida Acrucha 5" e "salva" a remoção
Then um o endereço "Avenida Acrucha 5" do usuário de CPF "129890870640" é removido
And o usuário de CPF "129890870640" está na página de "enredeços" atualizada