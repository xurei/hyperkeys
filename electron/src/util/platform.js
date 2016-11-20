//TODO on appelle getPlatformName trop souvent, ca pourrait être optimisé

function getPlatformName() {
	if (/^win/.test(process.platform))
		return "windows";
	if (/^osx|darwin/.test(process.platform))
		return "mac";
	if (/^linux/.test(process.platform))
		return "linux";
}

function getPlatformArch() {
	return process.arch;
}

var isWin = (getPlatformName() == "windows");

var platform = {
	name: getPlatformName(),
	arch: getPlatformArch(),
	
	isWin: isWin,
	isWin32: (isWin && getPlatformArch() == "ia32"),
	isWin64: (isWin && getPlatformArch() == "x64"),
	
	isMac: (getPlatformName() == "mac"),
	isLinux: (getPlatformName() == "linux"),
};

module.exports = platform;