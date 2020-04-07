#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

function compile_module {
	MODULE_NAME=$1
	node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/hyperkeys-extensions/$MODULE_NAME/* -d build/hyperkeys-extensions/$MODULE_NAME --copy-files
	if test -f "src/hyperkeys-extensions/$MODULE_NAME/configscreen.js"; then
		webpack "src/hyperkeys-extensions/$MODULE_NAME/configscreen.js" --output "build/hyperkeys-extensions/$MODULE_NAME/configscreen.js"
	fi
}

# Build main
node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/main -d build --copy-files

# Build hyperkeys modules
#TODO iterate over folders and build instead of hard-coded
compile_module run-command
compile_module switch-window
compile_module window-pin-by-name
compile_module switch-audio

# Build app
webpack


