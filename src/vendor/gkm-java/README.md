# GKM
An event based, Global Keyboard and Mouse listener.

Tested on Windows 7, but should work on Linux and Mac OS X as well (untested).

## Why?
Node didn't have any global keyboard and mouse listener available at the time. This is only a bridge between the OS and node.js.

## Requirements
GKM-Java depends on [JNativeHook](https://code.google.com/p/jnativehook/), which runs on Java. Thus you will need to have a JVM available and more importantly, java availble on your PATH.

## License
The code is licensed under the MIT license (http://opensource.org/licenses/MIT). See license.txt.