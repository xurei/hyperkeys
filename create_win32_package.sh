#!/bin/bash

DIRNAME=$(dirname $0)
DIRNAME=$(readlink -f "$DIRNAME")

PREVDIR=`pwd`

echo "Packaging Win32 version"

echo $DIRNAME

command -v electron-packager >/dev/null 2>&1 || { echo >&2 "I require electron-packager but it's not installed.  Aborting."; exit 1; }

mkdir -p $DIRNAME/distr

function create_package_sub {
    ARCH=$1

    electron-packager $DIRNAME/bin hyperkeys --platform=win32 --arch=$ARCH --out=$DIRNAME/distr;
    makensis -Dplatform=$ARCH $DIRNAME/hyperkeys-base.nsi
    echo ""
}

create_package_sub ia32
create_package_sub x64

echo "Packaging done"
