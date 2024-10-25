#!/usr/bin/env bash

DIR=$(dirname $0)

$DIR/node_modules/.bin/electron $DIR/build --no-sandbox
