'use strict'

const request = require('request')

exports.recipielookup = function (req, res, next){
	const food = req.params.q
  const url = `https://api.edamam.com/search?q=${food}&app_id=e868005c&app_key=95292bcfa233ad79fe714df36c247770`
  console.log(url)
  
request.get(url, function(err, resp, body){
		const json = JSON.parse(body)
		console.log(json.hits[0], null, 2)
		if(!err && resp.statusCode == 200) {
			console.log(json.hits[0].recipe.label)
			const recipes = []
			for( let i = 0; i< json.hits.length; i++) {
				console.log(json.hits[i].recipe.label)
				let recipe = {
					name: json.hits[i].recipe.label,
          ingredients: json.hits[i].recipe.ingredients,
				}
				recipes.push(recipe)
			}
			res.send({recipes: recipes})
		}
	})
}