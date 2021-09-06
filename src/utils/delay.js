'use strict';

module.exports.WaitMilis = (milis) => {
	return new Promise(function (cb) {
		setTimeout(cb, milis);
	});
}
