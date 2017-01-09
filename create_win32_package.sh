#!/bin/bash

DIRNAME=$(dirname $0)
DIRNAME=$(readlink -f "$DIRNAME")

PREVDIR=`pwd`

echo "Packaging Win32 version"

echo $DIRNAME

mkdir -p $DIRNAME/distr

function create_package_sub {
    ARCH=$1

    node_modules/electron-packager/cli.js $DIRNAME/bin hyperkeys --platform=win32 --arch=$ARCH --out=$DIRNAME/distr --electron-version=1.4.13 --version=1.4.13
    makensis -V2 -Dplatform=$ARCH $DIRNAME/hyperkeys-base.nsi
    echo ""
}

create_package_sub ia32
create_package_sub x64

echo "Packaging done"
