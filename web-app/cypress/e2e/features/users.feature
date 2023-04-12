Feature: Cadastro e manuntenção de usuários
    As a usuário
    I want to conseguir me cadastrar no sistema
    So that eu possa atualizar e deletar minhas informações

Scenario: Cadastro com CPF já utilizado
Given o usuário está na página de "/authentication/sign-up"
When o usuário adiciona o nome "Clara Acrucha", CPF "12989087064", username "clara", email "clarinha@mail.com", senha "abcdef12" e escolhe ir para a próxima etapa
Then o usuário recebe uma mensagem "erro"

Scenario: Cadastro com username já utilizado
Given o usuário está na página de "/authentication/sign-up"
When o usuário adiciona o nome "Rafinha dos Reis", CPF "12342153411", username "rafinha", email "rafael@mail.com", senha "1234567a" e escolhe ir para a próxima etapa
Then o usuário recebe uma mensagem "erro"

Scenario: Cadastro com email já utilizado
Given o usuário está na página de "/authentication/sign-up"
When o usuário adiciona o nome "Pâmela Cristian", CPF "12342151111", username "pamela", email "aas10@mail.com", senha "abcdef00" e escolhe ir para a próxima etapa
Then o usuário recebe uma mensagem "erro"

Scenario: Cadastro com CPF inválido
Given o usuário está na página de "/authentication/sign-up"
When o usuário adiciona o nome "Camilla Marcelle", CPF "1" e username "camila"
Then o usuário recebe uma mensagem de erro "Formato inválido!"

Scenario: Cadastro com senha inválida
Given o usuário está na página de "/authentication/sign-up"
When o usuário adiciona a senha "000" e username "malu"
Then o usuário recebe uma mensagem de erro "Mínimo de 8 caracteres | Formato inválido!"

Scenario: Cadastro com email inválido 
Given o usuário está na página de "/authentication/sign-up"
When o usuário adiciona o email "mail" e username "malu"
Then o usuário recebe uma mensagem de erro "E-mail inválido!"

Scenario: Cadastro com dados pessoais obrigatórios vazios
Given o usuário está na página de "/authentication/sign-up"
When o usuário escolhe ir para a próxima etapa
Then o usuário está na página de "/authentication/sign-up"

# Scenario: Cadastro com dados obrigatórios corretos
# Given o usuário está na página de "/authentication/sign-up"
# When o usuário adiciona o nome "Malu Andrade", CPF "00100200304", username "maluzao", email "malu@mail.com", senha "000111ab" e escolhe ir para a próxima etapa
# Then o usuário está na página de "main-address"
# When o usuário escolhe ir para a próxima etapa
# Then o usuário está na página "cadastro pagamento"
# When o usuário adiciona o método de pagamento "credit" com número "0001000200030004" e o usuário confirma o "app-button"
# Then o usuário de CPF "00100200304" recebe uma mensagem "Sua conta foi cadastrada com sucesso"
# And o usuário de CPF "00100200304" está na página de "login"

# Scenario: Atualização de nome 
# Given o usuário está na página de "/profile"
# When o usuário edita seu nome para "Maluzinha" e "salva" as alterações
# Then o usuário de nome "Maluzinha" está na página de "perfil" atualizada

# Scenario: Edição de endereço 
# Given o usuário está na página de "endereço"
# When adiciona um endereço "Avenida Maluzinha 1" e "salva" as alterações
# Then o usuário está na página de "endereço" atualizada

# Scenario: Tentativa de remoção de conta com inserção de senha incorreta 
# Given o usuário está na página de "deletar conta"
# When o usuário insere a senha "deletar" e "confirma a remoção" da conta
# Then o usuário recebe uma mensagem "Senha incorreta"
# And o usuário está na página de "deletar conta"

# Scenario: Remoção de conta com inserção de senha correta 
# Given o usuário está na página de "deletar conta"
# When o usuário insere a senha corretamente e "confirma a remoção" da conta
# Then o usuário recebe uma mensagem "Sua conta foi deletada com sucesso" e o usuário está na página de "login"