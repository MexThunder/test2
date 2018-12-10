const request = require('request')

const storage = require('node-persist')
storage.initSync({"dir":"./storage"})

exports.addfood = function(label, callback) { 
//	console.log("now save food item")
	const url = `https://api.edamam.com/search?q=label:${label}`
	request.get( url, (err, res, body) => {
		if (err) return callback(Error('could not complete request'))
		const json = JSON.parse(body)
		if (json.totalItems === 0) {
			console.log('no results')
			return callback(Error('food not found'))
		}
		//console.log(JSON.stringify(json, null, 2))
		console.log(json.hits.length)
		const data = {
			
			label: json.hits[0].recipe.label
			//foodsource: json.items[0].recipe.source[0],
		}
		storage.setItemSync(label, data)
		return callback(null, data)
	})
}