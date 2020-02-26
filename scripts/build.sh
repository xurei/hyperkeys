#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

function compile_module {
	MODULE_NAME=$1
	node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/extensions/$MODULE_NAME/* -d build/extensions/$MODULE_NAME --copy-files
	if test -f "src/extensions/$MODULE_NAME/configscreen.js"; then
		webpack "src/extensions/$MODULE_NAME/configscreen.js" --output "build/extensions/$MODULE_NAME/configscreen.js"
	fi
}

rm -rf build || true
mkdir build

node $BASEPATH/build_package_json.js
cd $BASEPATH/../build
npm install
cd $BASEPATH/..

node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/main -d build --copy-files
compile_module run-command
compile_module switch-window
compile_module window-pin-by-name
webpack


