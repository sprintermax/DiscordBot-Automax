'use strict';

export const WaitMilis = (milis) => {
	return new Promise(function (cb) {
		setTimeout(cb, milis);
	});
}
