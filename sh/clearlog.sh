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
#sudo find log/ -name "*.log" -delete
#sudo find log/ -name "*.html" -delete
#sudo find log/ -name "*.txt" -delete
#sudo find apilog/ -name "*.log" -delete
#sudo find apilog/ -name "*.txt" -delete
find log/ -name "*.log" -delete
find log/ -name "*.html" -delete
find log/ -name "*.txt" -delete
find apilog/ -name "*.log" -delete
find apilog/ -name "*.txt" -delete