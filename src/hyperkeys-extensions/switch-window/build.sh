#!/usr/bin/env bash

set -e
BASEPATH=$(realpath $(dirname $0))

echo "OS type: $OSTYPE"

if [[ "$OSTYPE" == "win32" || "$OSTYPE" == "msys" ]]; then
	g++ $BASEPATH/win32/foregroundwin.cpp
fi
