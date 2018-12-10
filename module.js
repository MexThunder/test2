const request = require('request')
const storage = require('node-persist') // storage requires the use of node persist which is where data will be stored

storage.initSync() // storage in sync

const testableCode = require('./testableCode')

exports.validateFavourite = function validateFavourite(req, res, next) { //exports the functions, calls the function 
	if (req.body && req.body.label) {
		next()
	}
	res.send(400, 'food label missing') // if code cant run then print label is missing in the log
	res.end()
}

exports.addFavourite = function addFavourite(req, res) { //exports the functions, calls the function 
	if (storage.getItemSync(req.body.label) !== undefined) {
		res.send(400, 'favourite already exists')
		res.end()
	}
	storage.setItemSync(data.label, data)
	res.send(201, {status: 'added', label: req.body.label}) // prints the status into the console.
	res.end()
}

exports.updateFavourite = function updateFavourite(req, res) { //exports the functions, calls the function 
	if (testableCode.updateData(req.params.label)) {
		res.send(201, req.body)
		res.end()
	} else {
		res.send(400, 'favourite does not exist') // if code cannot run then the faavourite does not exsist
		res.end()
	}
}

exports.listFavourites = function listFavourites(req, res) { // exports functions, calls the functions
	if (testableCode.countItems) {
		res.send({ favourites: storage.values()})
		res.end()
	} else {
		res.send(400, 'no favourites in list') //else the function cannot run the there are no favs in the list
		res.end()
	}
}

exports.dofoodSearch = function dofoodSearch(req, res, next) { //exports function and calls function
	const q = req.query.q  // get the search term from the URL querystring
	const url = `https://api.edamam.com/search?q=${q}` //the api url that we will be using to search in

	request.get(url, function(error, response, body) { //gegt request for the url 
		if (!error && response.statusCode === 200) { // if  no error then runs the code
			const foods = [] //array for our food
			const results = JSON.parse(body).items

			for (let i = 0; i < results.length; i++) {
				const food = {
					source: results[i].recipe.source,
			
					label: results[i].recipe.label, 
				
				}

				foods.push(food)
			}
			res.send({foods: foods})
		} else {
			res.send(501, {message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
		}
	})
}
