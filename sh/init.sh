#!/bin/sh
current_dir=$(pwd)
script_dir=$(dirname $0)

if [ $script_dir = '.' ]
then
script_dir="$current_dir"
fi
echo $script_dir
app_dir=$(dirname $script_dir)
echo $app_dir
cd $app_dir
php artisan clear-compiled
php artisan ide-helper:generate
php artisan optimize
mv './_ide_helper.php' './app/_ide_helper.php'
composer dump-autoload