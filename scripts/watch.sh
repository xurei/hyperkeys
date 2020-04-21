#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

function compile_module {
	MODULE_NAME=$1
	if test -f "src/extensions/$MODULE_NAME/configscreen.js"; then
		webpack --watch "src/extensions/$MODULE_NAME/configscreen.js" --output "build/extensions/$MODULE_NAME/configscreen.js" &
	fi
}

# Build hyperkeys modules
#TODO iterate over folders and build instead of hard-coded
#compile_module run-command
#compile_module switch-window
#compile_module window-pin-by-name
#compile_module switch-audio
#compile_module ifttt-webhook

# Build app
webpack --watch


