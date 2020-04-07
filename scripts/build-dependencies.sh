#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

mkdir -p build/vendor

# Add non-dev js dependencies
node $BASEPATH/build_package_json.js
cd $BASEPATH/../build
npm install
cd $BASEPATH/..
