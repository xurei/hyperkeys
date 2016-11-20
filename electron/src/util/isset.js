module.exports = function isset(variable) {
	return !(typeof variable === 'undefined' || variable === null);
};
