#!/usr/bin/env bash

BASEPATH=$(realpath $(dirname $0))
i686-w64-mingw32-g++ $BASEPATH/win32/foregroundwin.cpp
