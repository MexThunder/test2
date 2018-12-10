'use strict'
exports.check = function(name, callback) {
	const names = ['phoenix']
	if (names.indexOf(name) > -1) {
		// success
		const result = 'found'
		return callback(null, result)
	} else {
		// error
		const message = ''
		return callback(message)
	}
}