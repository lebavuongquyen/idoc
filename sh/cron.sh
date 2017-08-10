#!/bin/sh
# get dir for output file
current_dir=$(pwd)
script_dir=$(dirname $0)
if [ $script_dir = '.' ]
then
script_dir="$current_dir"
fi
echo $script_dir
app_dir=$(dirname $script_dir)
echo $app_dir
cd "$app_dir/log"
find . -name "*send*.html" -delete
set cronfile="/etc/cron.d/sendemail"
sudo crontab -l > %cronfile%
echo "*/5 * * * * $script_dir/send_email.sh" > %cronfile%
echo "0 0 1 * * $script_dir/clearlog.sh" >> %cronfile%
sudo crontab < %cronfile%
sudo rm %cronfile%
sudo crontab -l
