# Ambiente

- SO: Linux Ubuntu 22.04
- Node v20.12.2
- Docker v26.0.1
- Docker-Compose v1.29.2

# Executando projeto

## Passo a passo para executar o projeto com o Docker-Compose

1. Certifique-se de ter o `node.js`, `docker` e o `docker-compose` na sua máquina;
2. Solicite o arquivo `.env` para o dono do projeto e ao adquirir ele, coloque-o na raiz do projeto;
3. Na raiz do projeto execute o comando `docker-compose build`;
4. Posteriomente, ainda na raiz do projeto, execute `docker-compose up -d`;
5. Passo a passo finalizado, já é possível utilizar as rotas da API.

## Passo a passo opicional para executar o projeto localmente de modo que o banco de dados execute com o Docker e a API node execute na sua máquina sem uso de conteineres

1. Certifique-se de ter o `node.js`, `docker` e o `docker-compose` na sua máquina;
2. Solicite o arquivo `.env` para o dono do projeto;
3. Comente todo o trecho de código no arquivo `docker-compose.yml` referente à execução do `app`. Ou seja:

```
  # app:
  #   build: .
  #   container_name: fin_api
  #   env_file:
  #     - .env
  #   ports:
  #     - 8080:8080
  #   links:
  #     - database
  #   depends_on:
  #     - database

```

4. Na raiz do projeto execute o comando `docker-compose build`;
5. Posteriomente, ainda na raiz do projeto, execute `docker-compose up -d` e assim o banco de dados e o portal admin do Postgres estará executando perfeitamente;
6. No seu shell, e na raiz do projeto, execute `npm i` para instalar as dependências;
7. Ainda na raiz do projeto, altere o valor da chave `STAGE` do arquivo `.env` para `local`.

8. Altere também o host no arquivo check-database-status.sh:

```ssh
HOST="localhost"  # antes era "database"
PORT="5432"
USER="postgres"
PASSWORD="jsnulvonmktoqbtb"
DATABASE="fin_api_db"
```

- E altere o arquivo ormconfig.json, altere o campo host para `localhost` ao invés de database.

9. Execute agora o comando: chmod +x check-database-status.sh (caso esteja no linux)
10. Posteriormente execute o comando: ´./check-database-status.sh´
11. Por fim, execute o comando `npm run start:no-migration` para iniciar o servidor;
12. Passo a passo finalizado, já é possível utilizar as rotas da API.

# Outras informações

- Imagem pública no Docker Hub:
- Porta padrão: 8080

# Helper

- Caso alguma coisa saia do controle, tente remover todos os volumes, imagens e containers com esse comando: `docker system prune -a --volumes`. E posteriormente reinicie a aplicação.
