function getPlatformName() {
	if (/^win/.test(process.platform))
		return "windows";
	if (/^osx|darwin/.test(process.platform))
		return "mac";
	if (/^linux/.test(process.platform))
		return "linux";
}

module.exports = {
	name: getPlatformName(),
	isWin: (getPlatformName() == "windows"),
	isMac: (getPlatformName() == "mac"),
	isLinux: (getPlatformName() == "linux"),
};