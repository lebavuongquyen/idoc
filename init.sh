php artisan clear-compiled
php artisan ide-helper:generate
php artisan optimize
mv './_ide_helper.php' './app/_ide_helper.php'
composer dump-autoload