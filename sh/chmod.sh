#!/bin/bash

#--------------------------------------------------------------------------------------------------
# include function
#--------------------------------------------------------------------------------------------------
uname -a
hash sudo 2>/dev/null || { echo >&2 "You are not in a linux server.  Aborting set permission."; exit 1; }
source "$(dirname $0)/func.sh"
func_app_dir app_dir
cd "$app_dir"

# #--------------------------------------------------------------------------------------------------
# # do acion
# #--------------------------------------------------------------------------------------------------
sudo find env/ -type f -exec sudo chmod 0777 {} \;
sudo find log/ -type d -exec sudo chmod 0777 {} \;
sudo find log/ -type f -exec sudo chmod 0777 {} \;
sudo find apilog/ -type d -exec sudo chmod 0777 {} \;
sudo find apilog/ -type f -exec sudo chmod 0777 {} \;
sudo find uploads/ -type d -exec sudo chmod 0777 {} \;
sudo find uploads/ -type f -exec sudo chmod 0777 {} \;
sudo find sh/ -type d -exec sudo chmod 0777 {} \;
sudo find sh/ -type f -exec sudo chmod 775 {} \;
sudo find storage/ -type d -exec sudo chmod 0777 {} \;
sudo find storage/ -type f -exec sudo chmod 0777 {} \;
sudo find vendor/ -type d -exec sudo chmod 0777 {} \;
sudo find vendor/ -type f -exec sudo chmod 0777 {} \;
