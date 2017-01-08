#!/bin/bash

function create_package_sub {
    PREFIX="hyperkeys-win32"

    DIRNAME=$1
    DIRNAME=$(readlink -f "$DIRNAME")
    DIRNAME=$DIRNAME/$PREFIX-$2

    PREVDIR=`pwd`

    echo $DIRNAME

    cd $DIRNAME

    makensis -Dplatform=$1 $PREVDIR/$3

    cd $PREVDIR
}

echo "Creating windows installer"

create_package_sub $1 ia32 hyperkeys-base.nsi
echo "----------------"
#create_package_sub $1 x64 hyperkeys-base.nsi

echo "Windows installer created"