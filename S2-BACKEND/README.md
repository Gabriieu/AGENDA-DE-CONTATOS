# Documentação da API

## Introdução
Este documento fornece uma documentação detalhada para os endpoints da nossa aplicação. A API permite que os usuários realizem várias ações relacionadas a contas de usuário e contatos. Os endpoints da API são protegidos com mecanismos de autenticação e autorização para garantir a segurança dos dados.

## Primeiros passos
1. Primeiramente deve-se instalar as dependências utilizando o comando `npm install`
2. Crie o arquivo de variáveis de ambiente chamado `.env` na pasta raiz e preencha-o com as informações necessário conforme o modelo `.env.example`
**Obs: certifique-se que o banco de dados está criado.**
3. Após criado o banco de dados, utilize o comando `npm run typeorm migration:generate src/migrations/firstMigration -- -d src/data-source` para criar a primeira migração de tabelas
4. Em seguida utilize o comando `npm run typeorm migration:run -- -d ./src/data-source.ts` para criar a tabela no banco de dados.
4. Após concluídas as etapas anteriores, utilize o comando `npm run dev` para rodar a aplicação.


### URL Base
`https://localhost:3000`

### Autenticação
Todos os endpoints, exceto as rotas de login e criação de usuário, exigem autenticação. Para acessar esses endpoints, os clientes devem incluir um JWT (JSON Web Token) válido nos cabeçalhos da solicitação.

## Endpoints

### 1. Login

#### URL: `POST /login`
Este endpoint permite que os usuários façam login e obtenham um token de autenticação.

##### Corpo da Solicitação
- `email`: Endereço de e-mail do usuário.
- `password`: Senha do usuário.

##### Resposta
- Succeso: `200 OK`: {token: string}
- Falha: `403 Forbidden`: {message: Invalid credentials}

### 2. Criar Usuário

#### URL: `POST /users`
Este endpoint permite que os usuários criem uma nova conta.

##### Corpo da Solicitação
- `email`: Endereço de e-mail do usuário (string, obrigatório, único).
- `password`: Senha do usuário (string, obrigatório).
- `full_name`: Nome do usuário (string, obrigatório).
- `phone`: Informações de contato do usuário (string, obrigatório).

##### Resposta
- `201 Created`: Dados do usuário retornado.
- `400 Bad Request`: Corpo da solicitação inválido.
- `409 Conflict`: E-mail fornecido já existe.

### 3. Obter Usuário

#### URL: `GET /users/:id`
Este endpoint permite que os usuários obtenham informações de sua conta ou de outro usuário.

##### Parâmetros da Solicitação
- `id`: ID do usuário (número, obrigatório).

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Resposta
- `200 OK`: Solicitação bem-sucedida com os dados do usuário.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.
- `403 Forbidden`: Acessando a conta de outro usuário sem ser admin.
- `404 Not Found`: Usuário com o ID fornecido não encontrado.

### 4. Atualizar Usuário

#### URL: `PATCH /users/:id`
Este endpoint permite que os usuários atualizem informações de sua conta.

##### Parâmetros da Solicitação
- `id`: ID do usuário (número, obrigatório).

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Corpo da Solicitação
- `email`: Endereço de e-mail atualizado (string, opcional, único).
- `password`: Senha atualizada (string, opcional).
- `full_name`: Nome atualizado (string, opcional).
- `phone`: Informações de contato atualizadas (string, opcional).

##### Resposta
- `200 OK`: Novos dados atualizados do usuário.
- `400 Bad Request`: Corpo da solicitação inválido.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.
- `403 Forbidden`: Atualizando a conta de outro usuário sem ser admin.
- `404 Not Found`: Usuário com o ID fornecido não encontrado.

### 5. Excluir Usuário

#### URL: `DELETE /users/:id`
Este endpoint permite que os usuários excluam sua conta.

##### Parâmetros da Solicitação
- `id`: ID do usuário (número, obrigatório).

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Resposta
- `204 No Content`: Conta de usuário excluída com sucesso.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.
- `403 Forbidden`: Excluindo a conta de outro usuário sem ser admin.
- `404 Not Found`: Usuário com o ID fornecido não encontrado.

### 6. Criar Contato

#### URL: `POST /contacts`
Este endpoint permite que os usuários criem um novo contato.

##### Corpo da Solicitação
- `full_name`: Nome do contato (string, obrigatório).
- `email`: Endereço de e-mail do contato (string, obrigatório, único).
- `phone`: Número de telefone do contato (string, obrigatório, único).

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Resposta
- `201 Created`: Contato criado com sucesso.
- `400 Bad Request`: Corpo da solicitação inválido.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.
- `409 Conflict`: Contato com o e-mail ou telefone fornecido já existe.

### 7. Listar Contatos

#### URL: `GET /contacts`
Este endpoint permite que os usuários obtenham uma lista de seus contatos.

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Resposta
- `200 OK`: Solicitação bem-sucedida com uma lista de contatos.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.

### 8. Excluir Contato

#### URL: `DELETE /contacts/:id`
Este endpoint permite que os usuários excluam um contato.

##### Parâmetros da Solicitação
- `id`: ID do contato (número, obrigatório).

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Resposta
- `204 No Content`: Contato excluído com sucesso.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.
- `403 Forbidden`: Excluindo o contato de outro usuário.
- `404 Not Found`: Contato com o ID fornecido não encontrado.

### 9. Atualizar Contato

#### URL: `PATCH /contacts/:id`
Este endpoint permite que os usuários atualizem as informações de um contato.

##### Parâmetros da Solicitação
- `id`: ID do contato (número, obrigatório).

##### Cabeçalhos da Solicitação
- `Authorization`: Token Bearer (JWT)

##### Corpo da Solicitação
- `full_name`: Nome do contato atualizado (string, opcional).
- `email`: Endereço de e-mail do contato atualizado (string, opcional, único).
- `phone`: Número de telefone do contato atualizado (string, opcional, único).

##### Resposta
- `200 OK`: Contato atualizado com sucesso.
- `400 Bad Request`: Corpo da solicitação inválido.
- `401 Unauthorized`: Token de autenticação ausente ou inválido.
- `403 Forbidden`: Atualizando o contato de outro usuário.
- `404 Not Found`: Contato com o ID fornecido não encontrado.


## Conclusão
Esta documentação da API fornece uma visão geral dos endpoints disponíveis, suas funcionalidades, parâmetros necessários e as respostas esperadas. Os clientes podem utilizar esta documentação para interagir com a API de forma eficaz e segura.
