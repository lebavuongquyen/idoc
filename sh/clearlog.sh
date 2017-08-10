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
sudo find log/ -name "*.log" -delete
sudo find log/ -name "*.html" -delete
sudo find log/ -name "*.txt" -delete
sudo find apilog/ -name "*.log" -delete
sudo find apilog/ -name "*.txt" -delete