#Suppression de l'ancien container
docker stop oracle_cofina_cof_credit;
docker rm oracle_cofina_cof_credit;

#Création de la base de données:
docker container create -it --name oracle_cofina_cof_credit -p 1522:1521 -e ORACLE_PWD=welcome123 container-registry.oracle.com/database/express:latest;
docker update --restart=always oracle_cofina_cof_credit;

#Démarage de la base de données:
docker start oracle_cofina_cof_credit;

#Attendre pour le démarage de la bd
sleep 20;

#Création de l'utilisateur et configuration:
# sqlplus -S system/welcome123@localhost:1522/xe @./user_creation.sql;

#Migration laravel
php artisan migrate --seed

#Connexion à la base de données
# sqlplus system/welcome123@localhost:1522/xe;

# #ou
# #Création de l'utilisateur et configuration:
# ALTER SESSION SET "_ORACLE_SCRIPT"=true;
# DROP USER COFINA_COF_CREDIT;
# CREATE USER cofina_cof_credit IDENTIFIED BY Coftg2021;
# GRANT CREATE SESSION, CREATE TABLE TO cofina_cof_credit;
# #GRANT SELECT, INSERT, UPDATE, DELETE on cofina_cof_credit.* TO cofina_cof_credit;
# CONNECT cofina_cof_credit/Coftg2021@localhost:1522/xe
# SELECT table_name FROM user_tables;
