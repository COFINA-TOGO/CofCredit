rm credit.zip;
wget https://49c5-156-38-73-89.ngrok-free.app/credit.zip;
unzip -o credit.zip;
# cp -r ../tmp/vendor;
cp ../tmp/.env .;
rm public/storage;
composer install;
php artisan storage:link;
php artisan migrate:refresh --seed;
