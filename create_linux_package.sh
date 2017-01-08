#!/bin/bash

DIRNAME=$(dirname $0)
DIRNAME=$(readlink -f "$DIRNAME")

PREVDIR=`pwd`

echo "Packaging Linux version"

echo $DIRNAME

command -v electron-packager >/dev/null 2>&1 || { echo >&2 "I require electron-packager but it's not installed.  Aborting."; exit 1; }

mkdir -p $DIRNAME/distr

function create_package_sub {
    ARCH=$1

    electron-packager $DIRNAME/bin hyperkeys --platform=linux --arch=$ARCH --overwrite --out=$DIRNAME/distr;

    tar --directory=$DIRNAME/distr -czf $DIRNAME/distr/hyperkeys-linux-$ARCH.tar.gz hyperkeys-linux-$ARCH
}

create_package_sub ia32
create_package_sub x64

echo "Packaging done"
