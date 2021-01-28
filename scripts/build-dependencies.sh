#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

# Build production package.json
node $BASEPATH/build_package_json.js

# Copy native files
cp -R $BASEPATH/../natives $BASEPATH/../build

# Add non-dev js dependencies
cd $BASEPATH/../build
npm install

# Node rebuild
npm rebuild --runtime=electron --target=10.3.1 --disturl=https://atom.io/download/atom-shell --abi=$(../node_modules/.bin/electron -a)

# Patching dependency files to use local binaries
patch -N node_modules/active-win/lib/linux.js ../patches/active-win.patch

cd $BASEPATH/..
