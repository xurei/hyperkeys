#!/bin/bash

DIRNAME=$(dirname $0)
DIRNAME=$(readlink -f "$DIRNAME")

PREVDIR=`pwd`

echo "Packaging Linux version"

echo $DIRNAME

mkdir -p $DIRNAME/distr

function create_package_sub {
    ARCH=$1

    node_modules/electron-packager/cli.js $DIRNAME/bin hyperkeys --platform=linux --arch=$ARCH --out=$DIRNAME/distr --electron-version=1.4.13 --version=1.4.13

    tar --directory=$DIRNAME/distr -czf $DIRNAME/distr/hyperkeys-linux-$ARCH.tar.gz hyperkeys-linux-$ARCH
}

create_package_sub ia32
create_package_sub x64

echo "Packaging done"
