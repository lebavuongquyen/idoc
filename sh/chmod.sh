#!/bin/sh
#--------------------------------------------------------------------------------------------------
# include function
#--------------------------------------------------------------------------------------------------
source "$(dirname $0)/func.sh"
func_app_dir app_dir
cd "$app_dir"

#--------------------------------------------------------------------------------------------------
# do acion
#--------------------------------------------------------------------------------------------------
#sudo find env/ -type f -exec sudo chmod 777 {} \;
#sudo find log/ -type d -exec sudo chmod 777 {} \;
#sudo find log/ -type f -exec sudo chmod 777 {} \;
#sudo find apilog/ -type d -exec sudo chmod 777 {} \;
#sudo find apilog/ -type f -exec sudo chmod 777 {} \;
#sudo find uploads/ -type d -exec sudo chmod 777 {} \;
#sudo find uploads/ -type f -exec sudo chmod 777 {} \;
#sudo find sh/ -type d -exec sudo chmod 777 {} \;
#sudo find sh/ -type f -exec sudo chmod 775 {} \;
find env/ -type f -exec chmod 777 {} \;
find log/ -type d -exec chmod 777 {} \;
find log/ -type f -exec chmod 777 {} \;
find apilog/ -type d -exec chmod 777 {} \;
find apilog/ -type f -exec chmod 777 {} \;
find uploads/ -type d -exec chmod 777 {} \;
find uploads/ -type f -exec chmod 777 {} \;
find sh/ -type d -exec chmod 777 {} \;
find sh/ -type f -exec chmod 775 {} \;
find storage/ -type d -exec chmod 777 {} \;
find storage/ -type f -exec chmod 775 {} \;
find vendor/ -type d -exec chmod 777 {} \;
find vendor/ -type f -exec chmod 775 {} \;