#!/bin/bash

# Nome do volume e do contêiner temporário
VOLUME_NAME="pgdata"
TEMP_CONTAINER_NAME="temp_postgres"

# Caminho para o local de backup
BACKUP_PATH="./src/database/backups"

# Cria um contêiner temporário que monta o volume
docker run -d  --name $TEMP_CONTAINER_NAME -v $VOLUME_NAME:/volume busybox

docker ps -a

# Copia os dados do contêiner para o local de backup
docker cp $TEMP_CONTAINER_NAME:/volume $BACKUP_PATH

# Para e remove o contêiner temporário
docker stop $TEMP_CONTAINER_NAME