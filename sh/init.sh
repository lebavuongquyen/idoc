#!/bin/bash

#--------------------------------------------------------------------------------------------------
# include function
#--------------------------------------------------------------------------------------------------
source "$(dirname $0)/func.sh"

#--------------------------------------------------------------------------------------------------
# Set to root folder
#--------------------------------------------------------------------------------------------------
func_app_dir app_dir
func_sh_dir sh_dir
log "\nGoto app dir : $app_dir"
cd $app_dir


#--------------------------------------------------------------------------------------------------
# Load vendor if first time clone from git
#--------------------------------------------------------------------------------------------------
log "\nSet permission for log,apilog,upload and clearlog"
chmod 777 "$sh_dir/chmod.sh"
"$sh_dir/chmod.sh"
"$sh_dir/clearlog.sh"

#--------------------------------------------------------------------------------------------------
# Load vendor if first time clone from git
#--------------------------------------------------------------------------------------------------
if [ ! -e "vendor" ]
then
log "\nDownload vendor if the folder is not exists"
composer update
fi

#--------------------------------------------------------------------------------------------------
# Config app variable
#--------------------------------------------------------------------------------------------------
APP_ENV=local
log "\nCurrent enviroment is $APP_ENV"


#--------------------------------------------------------------------------------------------------
# Run init function
#--------------------------------------------------------------------------------------------------

log "\nCreate .env file from env/.env.$APP_ENV"
chmod 777 .env
cp "env/.env.$APP_ENV" ".env" 

log "\nInit laravel"
php artisan app:name IDoc
sed -i 's/APP_NAME.*/APP_NAME=IDoc/' ".env"
php artisan clear-compiled
php artisan ide-helper:generate
php artisan optimize
mv './_ide_helper.php' './app/_ide_helper.php'
php artisan cache:clear
php artisan view:clear
composer dump-autoload

log "\nReset the database "
func_env DB_DATABASE
php artisan db:create $DB_DATABASE -F
php artisan migrate

log "\nGenerate Models"
php artisan code:models