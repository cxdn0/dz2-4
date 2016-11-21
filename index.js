
// ##############
// ### task2D ###
// ##############

const express = require('express');
const colors = require('onecolor');
const querystring = require('querystring');

var cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {

	if(typeof(req.query.color)=="undefined")
	var colorp = '';
	else
	var colorp = Object.keys(querystring.decode(req.query.color.trim().toLowerCase()))[0];

	if (/^[0-9a-f]{6}$|^[0-9a-f]{3}$/gi.test(colorp))
	colorp = '#'+colorp;

	try {
		if (/^[^#]/gi.test(colorp)) {
			//console.log((colorp));
			colorp.match(/[0-9]+/gi).map( (num) => {
				if(num>255) throw new Error('Error color');
			});
		}

		if (/^rgb/gi.test(colorp) && colorp.match(/[0-9]+/gi).length>3) {
			throw new Error('Too many values in rgb color');
		}

		if (/^hsl/gi.test(colorp) &&
			((colorp.match(/[0-9]+/gi)[1]!=0 && colorp.match(/[0-9]+/gi)[2]==0)
			|| colorp.match(/[0-9]+%/gi).length==0)) {
			throw new Error('HSL color error');
		}

		colorp = colors(colorp).hex();
	} catch (e) {
		console.log(e);
		colorp = "Invalid color";
	}

	console.log(`Query: ${req.originalUrl} - Вывод: ${colorp}`);
	res.send(colorp);

});

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
