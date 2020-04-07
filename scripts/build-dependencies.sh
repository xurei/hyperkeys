#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

mkdir -p build/vendor

# Building non-js dependencies
# GKM Java
echo "--- Build GKM"
cd $BASEPATH/../src/vendor/gkm-java
ant package
cp $BASEPATH/../src/vendor/gkm-java/dist/gkm.jar $BASEPATH/../build/vendor
cd -
echo "--- Build GKM done"
echo ""

# Add non-dev js dependencies
node $BASEPATH/build_package_json.js
cd $BASEPATH/../build
npm install
cd $BASEPATH/..
