rm recrutement.zip;
wget https://42ba-156-38-73-89.ngrok-free.app/recrutement.zip;
unzip -o recrutement.zip;
cp .env-prod .env;
composer install;
php artisan storage:link;
# migrate:refresh effaçait toute la base : on applique seulement les nouvelles migrations
php artisan migrate --force;
php artisan config:cache;
php artisan route:cache;
