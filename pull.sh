sudo chown -R admincoftg:admincoftg -R ../CofCredit;
git pull;
pnpm build;
#php artisan migrate;
sudo chown -R www-data:www-data -R ../CofCredit;
sudo chmod 777 ./pull.sh;
