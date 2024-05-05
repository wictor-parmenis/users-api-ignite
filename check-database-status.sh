#!/bin/bash

# Variáveis de conexão ao banco de dados
HOST="database"
PORT="5432"
USER="postgres"
PASSWORD="jsnulvonmktoqbtb"
DATABASE=fin_api_db

SQL_QUERY="SELECT datname FROM pg_database WHERE datname = '$DATABASE';"

result=$(PGPASSWORD="$PASSWORD" psql -h "$HOST" -p "$PORT" -U "$USER" -tAc "$SQL_QUERY")

# Loop sobre os resultados e exibe os bancos de dados
if [ -n "$result" ]; then
    echo "Is not need execute migration."
else
    echo "Executing migration..."
    npx typeorm migration:run
fi
