#!/usr/bin/env bash
set -e

BASEPATH=$(realpath $(dirname $0))

function compile_module {
	MODULE_NAME=$1
	echo "-- Building $MODULE_NAME..."
	node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/hyperkeys-extensions/$MODULE_NAME/* -d build/hyperkeys-extensions/$MODULE_NAME --copy-files
	if test -f "src/hyperkeys-extensions/$MODULE_NAME/configscreen.js"; then
		webpack "src/hyperkeys-extensions/$MODULE_NAME/configscreen.js" --output "build/hyperkeys-extensions/$MODULE_NAME/configscreen.js"
	fi
	if test -f "src/hyperkeys-extensions/$MODULE_NAME/build.sh"; then
		bash "src/hyperkeys-extensions/$MODULE_NAME/build.sh";
	fi
	echo ""
}

if [[ $1 != '' ]]; then
	echo "Building $1 ONLY"
	compile_module $1
	exit 0;
else
	# Build main
	echo "-- Building Main"
	node_modules/.bin/babel --config-file $BASEPATH/../.babelrc.main src/main -d build --copy-files

	# Build package.json
	node $BASEPATH/build_package_json.js

	# Build hyperkeys modules
	ls -l $BASEPATH/../src/hyperkeys-extensions | grep '^d' | awk '{print $9}' | \
	while read line; do
	   compile_module $line
	done

	# Build app
	webpack
fi



