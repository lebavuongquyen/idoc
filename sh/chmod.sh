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
sudo find log/ -type d -exec sudo chmod 777 {} \;
sudo find log/ -type f -exec sudo chmod 777 {} \;
sudo find apilog/ -type d -exec sudo chmod 777 {} \;
sudo find apilog/ -type f -exec sudo chmod 777 {} \;
sudo find uploads/ -type d -exec sudo chmod 777 {} \;
sudo find uploads/ -type f -exec sudo chmod 777 {} \;
sudo find sh/ -type d -exec sudo chmod 777 {} \;
sudo find sh/ -type f -exec sudo chmod 775 {} \;