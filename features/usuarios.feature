Feature: Cadastro e manuntenção de usuários

As a usuário
I want to conseguir me cadastrar no sistema
So that eu possa atualizar e deletar minhas informações
 
Scenario: Cadastro com CPF já utilizado
Given que o usuário de CPF "12989087064" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais"
When o usuário adiciona o nome "Clara Acrucha", CPF "12989087064", email "clara@mail.com" e senha "abcdef12"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Usuário já cadastrado"

Scenario: Cadastro com username já utilizado
Given que o usário de CPF "12342153411" não está cadastrado no sistema
And o nome de usuário "rafinha" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais"
When o usuário adiciona o nome "Rafinha dos Reis", CPF "12342153411", email "rafael@mail.com", senha "1234567a" e nome de usuário "rafinha"
Then o usuário recebe uma mensagem de aviso "Nome de usuário já cadastrado"

Scenario: Cadastro com email já utilizado
Given que o usuário de CPF "12342151111" não está cadastrado no sistema
And que o email "pam@mail.com" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário adiciona o nome "Pâmela Cristian", CPF "12342151111", email "pam@mail.com" e senha "abcdef00"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Email já cadastrado"

Scenario: Cadastro com dados obrigatórios e não obrigatórios corretos
Given que o CPF "11022033040" não está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário adiciona o nome "Michelly Lima", CPF "00100000504", email "michelly@mail.com", senha "1111000a", nome de usuário "michelly" e número de celular "81999223344"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro endereço"
When o usuário adiciona o endereço "Avenida Lima 5"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro pagamento"
When o usuário adiciona o método de pagamento "PIX"
And o usuário escolhe se "cadastrar"
Then o usuário de CPF "11022033040" é cadastrado no sistema
And o usuário de CPF "11022033040" recebe uma mensagem de aviso "Sua conta foi cadastrada com sucesso"
And o usuário de CPF "11022033040" está na página de "login"

Scenario: Cadastro com CPF inválido
Given que o usuário está na página de "cadastro dados pessoais"
When o usuário preenche o nome "Camilla Marcelle", CPF "1", email "camilla@mail.com" e senha "abdddf12"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Formato de CPF inválido."

Scenario: Cadastro com senha inválida
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais"
When o usuário preenche o nome "Malu Santos", CPF "00100200304", email "malu@mail.com" e senha "000"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Formato de senha inválido"

Scenario: Cadastro com email inválido 
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário preenche o nome "Malu Santos", CPF "00100200304", email "mail" e senha "000111ab"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Formato de email inválido"

Scenario: Cadastro com dados pessoais obrigatórios vazios
Given que o usuário está na página de "cadastro dados pessoais" 
When o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Os campos em vermelho são obrigatórios"

Scenario: Cadastro com dados obrigatórios corretos
Given que o CPF "00100200304" não está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais" 
When o usuário preenche o nome "Malu Andrade", CPF "00100200304", email "malu@mail.com" e senha "000111ab" 
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro endereço"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário está na página "cadastro pagamento"
When o usuário adiciona o método de pagamento "Crédito" com número "0001"
And o usuário escolhe se "cadastrar"
Then o usuário de CPF "00100200304" é cadastrado no sistema
And o usuário de CPF "00100200304" recebe uma mensagem de aviso "Sua conta foi cadastrada com sucesso"
And o usuário de CPF "00100200304" está na página de "login"

Scenario: Atualização de nome 
Given que o usuário de CPF "00100200304" está na página de "dados pessoais"
When o usuário de CPF "00100200304" edita seu "nome" para "Maluzinha" e "salva" as alterações
Then o nome do usuário de CPF "00100200304" é atualizado para "Maluzinha"
And o usuário de CPF "00100200304" com nome "Maluzinha" está na página de "perfil" atualizada

Scenario: Adição de endereço 
Given que o usuário de CPF "00100200304" está na página de "endereço"
When o usuário de CPF "00100200304" adiciona um endereço "Avenida Maluzinha 1" e "salva" as alterações
Then um novo endereço "Avenida Maluzinha 1" é adicionado ao usuário de CPF "00100200304"
And o usuário de CPF "00100200304" está na página de "endereço" atualizada

Scenario: Remoção de endereço 
Given que o usuário de CPF "00100200304" está na página de "endereço"
When o usuário de CPF "00100200304" "deleta" o endereço "Avenida Maluzinha 1"
Then o endereço "Avenida Maluzinha 1" do usuário de CPF "00100200304" é removido
And o usuário de CPF "00100200304" está na página de "endereço" atualizada

Scenario: Tentativa de remoção de conta com inserção de senha incorreta 
Given que o usuário de CPF "00100200304" está na página de "deletar conta"
When o usuário de CPF "00100200304" insere a senha "deletar" e  "confirma a remoção" da conta
Then o usuário de CPF "00100200304" recebe uma mensagem de aviso "Senha incorreta"
And o usuário de CPF "00100200304" está na página de "deletar conta"

Scenario: Remoção de conta com inserção de senha correta 
Given que o usuário de CPF "00100200304" está na página de "deletar conta"
When o usuário de CPF "00100200304" insere a senha corretamente e "confirma a remoção" da conta
Then o usuário de CPF "00100200304" recebe uma mensagem de aviso "Sua conta foi removida com sucesso"
And o usuário de CPF "00100200304" é removido do sistema 
And o usuário está na página de "login"

