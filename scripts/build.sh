#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

rm -rf build || true
mkdir build

node $BASEPATH/build_package_json.js
node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/main -d build --copy-files
node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.web src/extensions -d build/extensions --copy-files
webpack
