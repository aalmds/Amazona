Feature: Cadastro e manuntenção de usuários
    As a usuário
    I want to conseguir me cadastrar no sistema
    So that eu possa atualizar e deletar minhas informações
 
Scenario: Cadastro com CPF já utilizado
Given o usuário de CPF "12989087064" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais"
When o usuário adiciona o nome "Clara Acrucha", CPF "12989087064", username "clara",  email "mvsm3@mail.com" e senha "abcdef12"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem "Usuário já cadastrado"

Scenario: Cadastro com username já utilizado
Given o usário de CPF "12342153411" não está cadastrado no sistema
And o nome de usuário "rafinha" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais"
When o usuário adiciona o nome "Rafinha dos Reis", CPF "12342153411", username "rafinha", email "rrl3@mail.com", senha "1234567a"
Then o usuário recebe uma mensagem "Usuário já cadastrado"

Scenario: Cadastro com email já utilizado
Given o usuário de CPF "12342151111" não está cadastrado no sistema
And que o email "pam@mail.com" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário adiciona o nome "Pâmela Cristian", CPF "12342151111", username "pamela", email "aas10@cin.ufpe.br" e senha "abcdef00"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem "Usuário já cadastrado"

Scenario: Cadastro com dados obrigatórios e não obrigatórios corretos
Given o CPF "11022033040" não está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário adiciona o nome "Michelly Lima", CPF "00100000504", username "michelly", email "michelly@mail.com", senha "1111000a" e número de celular "81999223344"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro endereço"
When o usuário adiciona o endereço "Avenida Lima 5"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro pagamento"
When o usuário adiciona o método de pagamento "PIX"
And o usuário escolhe se "cadastrar"
Then o usuário de CPF "11022033040" é cadastrado no sistema
And o usuário de CPF "11022033040" recebe uma mensagem "Sua conta foi cadastrada com sucesso"
And o usuário de CPF "11022033040" está na página de "login"

Scenario: Cadastro com CPF inválido
Given o usuário está na página de "cadastro dados pessoais"
When o usuário preenche o nome "Camilla Marcelle", CPF "1" e username "camilla"
Then o usuário recebe uma mensagem de erro "Formato inválido!"

Scenario: Cadastro com senha inválida
Given o usuário está na página de "cadastro dados pessoais"
When o usuário adiciona a senha "000" e username "malu"
Then o usuário recebe uma mensagem "Mínimo de 8 caracteres | Formato inválido!"

Scenario: Cadastro com email inválido
Given o usuário está na página de "cadastro dados pessoais" 
When o usuário adiciona o email "mail" e username "malu"
Then o usuário recebe uma mensagem "E-mail inválido!"

Scenario: Cadastro com dados pessoais obrigatórios vazios
Given o usuário está na página de "cadastro dados pessoais" 
When o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro dados pessoais"

Scenario: Cadastro com dados obrigatórios corretos
Given o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário preenche o nome "Malu Andrade", CPF "00100200304", username "maluzao", email "malu@mail.com" e senha "000111ab" 
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro endereço"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro pagamento"
When o usuário adiciona o método de pagamento "Crédito" com número "000100200030004"
And o usuário escolhe se "cadastrar"
Then o usuário de CPF "00100200304" é cadastrado no sistema
And o usuário de CPF "00100200304" recebe uma mensagem "Sua conta foi cadastrada com sucesso"
And o usuário de CPF "00100200304" está na página de "login"

Scenario: Atualização de nome 
Given o usuário de CPF "00100200304" está na página de "dados pessoais"
When o usuário de CPF "00100200304" edita seu "nome" para "Maluzinha" e "salva" as alterações
Then o nome do usuário de CPF "00100200304" é atualizado para "Maluzinha"
And o usuário de CPF "00100200304" com nome "Maluzinha" está na página de "perfil" atualizada

Scenario: Atualização de endereço
Given o usuário de CPF "00100200304" está na página de "endereço"
When o usuário de CPF "00100200304" insere o "endereço principal" "Avenida Maluzinha 1" e "salva" as alterações
Then o endereço do usuário de CPF "00100200304" é atualizado
Then o usuário está na página de "endereço" atualizada

Scenario: Tentativa de remoção de conta com inserção de senha incorreta 
Given o usuário de CPF "00100200304" está na página de "deletar conta"
When o usuário de CPF "00100200304" insere a senha "deletar" e "deleta" a conta
Then o usuário de CPF "00100200304" recebe uma mensagem "Senha incorreta"
And o usuário de CPF "00100200304" está na página de "deletar conta"

Scenario: Remoção de conta com inserção de senha correta 
Given o usuário de CPF "00100200304" está na página de "deletar conta"
When o usuário de CPF "00100200304" insere a senha corretamente e "deleta" a conta
Then o usuário de CPF "00100200304" recebe uma mensagem "Sua conta foi removida com sucesso"
And o usuário de CPF "00100200304" é removido do sistema 
And o usuário está na página de "login"
