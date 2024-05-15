#!/bin/sh

HOST="database"
PORT="5432"
USER="postgres"
PASSWORD="jsnulvonmktoqbtb"
DATABASE="fin_api_db"

# Altere este caminho para o executável typeorm, se necessário
TYPEORM_EXECUTABLE="npx typeorm"

# Consulta SQL para verificar se a tabela "users" existe
SQL_QUERY="SELECT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'users'
);"

# Aguardar até que o banco de dados esteja disponível
while ! nc -z "$HOST" "$PORT"; do
  echo "Aguardando o banco de dados estar disponível..."
  sleep 1
done

# Executar a consulta SQL e verificar o resultado
result=$(PGPASSWORD="$PASSWORD" psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -tAc "$SQL_QUERY")

if [ "$result" = "t" ]; then
    echo "Not need migration."
else
    echo "Executing migration..."
    sleep 90
    $TYPEORM_EXECUTABLE migration:run
fi
