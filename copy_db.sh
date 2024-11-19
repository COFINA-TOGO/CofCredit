#!/bin/bash

# Variables
SOURCE_DB="cofina_credit"
TARGET_DB="cofina_credit_save"
USER="cofina_credit_user"
PASSWORD="root"

# Exporter la base de données source
mysqldump -u $USER -p$PASSWORD $SOURCE_DB > $SOURCE_DB.sql

# Créer la nouvelle base de données
mysql -u $USER -p$PASSWORD -e "CREATE DATABASE $TARGET_DB;"

# Importer le fichier de vidage dans la nouvelle base de données
mysql -u $USER -p$PASSWORD $TARGET_DB < $SOURCE_DB.sql

echo "La base de données $SOURCE_DB a été copiée vers $TARGET_DB avec succès."
