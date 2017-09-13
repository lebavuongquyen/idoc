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

log "\nReset the database "
func_env DB_DATABASE
php artisan db:create $DB_DATABASE -F
php artisan migrate
php artisan db:seed --class=DatabaseSeeder
