#!/bin/sh
# get environment variable

func_app_dir() {
    current_dir=`readlink -f $(pwd)`
    script_dir=`readlink -f $(dirname $0)`
    if [ $script_dir = '.' ]
    then
    script_dir="$current_dir"
    fi
    app_dir=`readlink -f $(dirname $script_dir)`
    eval "$1='$app_dir'"
}


func_sh_dir(){
    func_app_dir app_dir
    eval "$1='$app_dir/sh'"
}

log() {
    echo -e "\e[32m$1\e[39m"
}

warn(){
    echo -e "\e[33m$1\e[39m"
}

error(){
    echo -e "\e[31m$1\e[39m"
}

