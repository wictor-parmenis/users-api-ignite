#!/bin/sh

HOST="database"
PORT="5432"
USER="postgres"
PASSWORD="jsnulvonmktoqbtb"
DATABASE=fin_api_db

# Change SQL query for a select for get users table. Check if exists.
SQL_QUERY="SELECT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'users'
);"



result=$(PGPASSWORD="$PASSWORD" psql -h "$HOST" -p "$PORT" -U "$USER" -tAc "$SQL_QUERY")

if [ -n "$result" ]; then
    echo "Is not need execute migration."
else
    echo "Executing migration..."
    npx typeorm migration:run
fi
