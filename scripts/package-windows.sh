#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0)/..)

node_modules/.bin/electron-builder --dir --win

# Remove unneeded libs
echo "Purging useless libs..."

## Create AppImage
node_modules/.bin/electron-builder --prepackaged=dist_packages/win-unpacked --win --p always
