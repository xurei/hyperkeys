#!/usr/bin/env bash

BASEPATH=$(realpath $(dirname $0))
g++ $BASEPATH/win32/foregroundwin.cpp
