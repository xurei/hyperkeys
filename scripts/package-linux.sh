#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0)/..)
echo $BASEPATH

node_modules/.bin/electron-builder --dir --linux

# Remove unneeded libs

# Create AppImage
node_modules/.bin/electron-builder --prepackaged=dist_packages/linux-unpacked --linux --p always
