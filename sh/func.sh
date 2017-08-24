#!/bin/sh
# get environment variable

func_app_dir() {
    current_dir=$(pwd)
    script_dir=$(dirname $0)
    if [ $script_dir = '.' ]
    then
        script_dir=$current_dir
    fi
    if [[ $current_dir == *"$script_dir" ]]
    then 
        app_dir=`readlink -f $(dirname $current_dir)`
    else
        app_dir=`readlink -f $(dirname $script_dir)`
    fi
    eval "$1=$app_dir"
}


func_sh_dir(){
    func_app_dir app_dir
    eval "$1=$app_dir/sh"
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

func_env(){
    func_app_dir app_dir
    key=$1
    value=$(awk -F "=" '/'$1'/ {print $2}' "$app_dir/.env"  | tr -d ' ')
    eval "$1=$value"
}