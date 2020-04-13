#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

electron-packager --platform=win32 --out out --asar --overwrite build hyperkeys

# Remove unneeded libs
rm -rf $BASEPATH/../out/hyperkeys-linux-x64/libvk_swiftshader.so
rm -rf $BASEPATH/../out/hyperkeys-linux-x64/swiftshader
rm -rf $BASEPATH/../out/hyperkeys-linux-x64/vk_swiftshader_icd.json
rm -rf $BASEPATH/../out/hyperkeys-linux-x64/libGLESv2.so
