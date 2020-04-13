#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0)/..)
echo $BASEPATH

node_modules/.bin/electron-builder --dir --linux

# Remove unneeded libs
echo "Purging useless libs..."
rm -rf $BASEPATH/dist_packages/linux-unpacked/swiftshader || true
rm -rf $BASEPATH/dist_packages/linux-unpacked/libGLESv2.so || true
rm -rf $BASEPATH/dist_packages/linux-unpacked/libEGL2.so || true
rm -rf $BASEPATH/dist_packages/linux-unpacked/chrome-sandbox || true

# Create AppImage
node_modules/.bin/electron-builder --prepackaged=dist_packages/linux-unpacked --linux --p always
