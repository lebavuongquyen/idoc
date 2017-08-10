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
current_date=`date "+%Y-%m-%d"`
current_date_time=`date "+%Y-%m-%d %H:%M:%S"`
echo $current_date
output_file="$app_dir/log/${current_date}_send_email.html"
echo $output_file
if [ ! -f "$output_file" ]; then
    touch $output_file
    sudo chmod 0777 $output_file
fi
curl "http://localhost/mrms/index.php/mail/send" >> "$output_file"
echo "<br>" >> "$output_file"
