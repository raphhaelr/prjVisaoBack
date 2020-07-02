## Gerenciador de projetos - @visaojrufop

### Problema central do projeto.

**1 -** Atualmente os projetos são gerenciados por planilhas.  

**2 -** Atualmente cada projeto depende do feedback do gerente para ser adicionado na planilha.  

**3 -** Dificuldade em gerenciar os projetos com agilidade.  

**4 -** O mais importante é ter as informações de forma segura e essas informações poder chegar em todas pessoas na empresa. 

### Requisitos

**1** - Área de login, somente gerentes podem manipular projetos, usuários comuns podem apenas visualizar.

**2 -** Área para administradores.  

**3 -** Nome do projeto, descrição, informações sobre o cliente e detalhes sobre o processo de etapas e sprints.  

**4 -** CRUD de projetos, etapas, sprints.  

**5 -** CRUD de usuários

### Setup

**Instalação de dependências**  

No diretório do projeto executar o script **`yarn install`** ou **`npm install`** para instalar todas as dependências utilizadas no projeto.

**Banco de dados**

Utilizar o PostgreSQL e criar uma Database com o nome **`prjvisao`**

**Configuração Knex QueryBuilder**

No arquivo **`knexfile.js`** localizado no diretório principal do projeto, configurar **`development`** com as especificações de conexão do banco de dados.  

No arquivo **`connection.js`** localizado no diretório **`src/database`** alterar a variável **`const config = configuration.production`** para **`const config = configuration.development`**

### Entidades 

**USERS**  
**PROJECTS**  
**STEPS**  
**SPRINTS**

### Execução

**Obs: Após instalar todas as dependências**

**1 -** Executar o comando **`yarn knex migrate:latest`** para criar as tabelas no banco de dados.  

**2 -** Executar o comando **`yarn knex seed:run`**

**3 -** Executar o comando **`yarn start`** ou **`npm start`** para executar o projeto em **http://localhost:3333**
