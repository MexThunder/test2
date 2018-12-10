var storage = require('node-persist')

storage.initSync()

// can write 2 tests
exports.checkData = function(data) {
	console.log(data)
	if (data.label === undefined) return false
	return true
}

// 2 tests
exports.addData = function(data) {
	if (storage.getItemSync(data.label) !== undefined) {
		return false
	}
	storage.setItemSync(data.label, data)
	return true
}

// 2 tests
exports.updateData = function(data) {
	if (storage.getItemSync(data.label) === undefined) {
		return false
	}
	const tempStore = storage.getItemSync(data.label)
	const addArray = [{tempStore, data}]
	storage.setItemSync(data.label, addArray)
	return true
}

// 2 tests
exports.countItems = function() {
	const favourites = storage.values()
	if (favourites.length) return true
	return false
}