#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))
EXTPATH="$BASEPATH/../src/hyperkeys-extensions"

function compile_module {
	MODULE_NAME=$1
	echo "$EXTPATH/$MODULE_NAME/configscreen.js"
	if test -f "$EXTPATH/$MODULE_NAME/configscreen.js"; then
		webpack --watch "$EXTPATH/$MODULE_NAME/configscreen.js" --output-path "$BASEPATH/../build/hyperkeys-extensions/$MODULE_NAME/"
	fi
}

# Build hyperkeys modules
#TODO iterate over folders and build instead of hard-coded
#compile_module run-command
#compile_module switch-window
#compile_module window-pin-by-name
#compile_module switch-audio
#compile_module ifttt-webhook

trap 'kill %1; kill %2' SIGINT

# Build hyperkeys module
compile_module $1 &

# Build app
webpack --watch


