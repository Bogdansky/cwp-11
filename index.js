const express = require('express');
const app = express();
const fs = require("fs");
// const readAll = require("./handlers/readAllFilms.js");
// const readFilm = require("./handlers/readFilm.js");

let films = require("./top250.json");
/*const film = {
	"id": int,
	"title": string,
	"rating": string, // оценка
	"year": int, // год выпуска
	"budget": int, // бюджет
	"gross": int, // сборы
	"poster": string, // url постера
	"position": int, // позиция в рейтинге
};*/

app.get('/api/films/readall', (req, res, readAll) =>
{
	console.log("readall");
	const defaultValues = {
		"sortField": "position",
		"sortOrder": "asc"
		// "page": "1",
		// "limit": "10",
		// "includeDeps": false
	};
	let compareField = defaultValues.sortField;
	let compareOrder = defaultValues.sortOrder;
// let viewPages = defaultValues.page;
// let viewLimit = defaultValues.limit;
// let includeDeps = defaultValues.includeDeps;

	function compareCustom(a, b) {
		if (a[compareField] > b[compareField])
		{
			return compareOrder === "asc" ? 1 : -1;
		}
		if (a[compareField] < b[compareField])
		{
			return compareOrder === "asc" ? -1 : 1;
		}
	}

	// module.exports.readAll = function(req, res, cb) {
		films.sort(compareCustom);
		// console.log("a" + JSON.stringify(films));
		// cb(null, films);
	// };
	// readAll(req, res, (err, result) =>
	// {
	// 	console.log(JSON.stringify(result));
		res.send(JSON.stringify(films));
	// });

});

app.get('/api/films/read/:id', (req, res, readFilm) =>
{
	// console.log(films[re])
	// readFilm(req, res, (err, result) =>
	// {
		console.log(req.params);
		res.send(JSON.stringify(films[req.params.id - 1]));
	// })
});

app.post('/api/films/create', (req, res, next) => {
	parseBodyJson(req, (err, payload) => {
		console.log(payload);
		payload.id = films[films.length - 1].id + 1;
		for (let i = 0; i < films.length; i++)
		{
			if (films[i].position === payload.position)
			{
				for (let j = films.indexOf(films[i]); j < films.length; j++)
				{
					films[j].position += 1;
				}
				break;
			}
		}
		console.log(films);
		films.push(payload);
		fs.writeFile("top250.json", JSON.stringify(films), "utf8", function () { });
		res.send(JSON.stringify(films[films.length - 1]));
	});
});

app.post('/api/films/update', (req, res, next) => {
	parseBodyJson(req, (err, payload) => {
		console.log(payload);
		if (payload.position !== undefined)
		{
			for (let i = 0; i < films.length; i++)
			{
				if (films[i].position === payload.position)
				{
					for (let j = films.indexOf(films[i]); j < films.length; j++)
					{
						films[j].position += 1;
					}
					break;
				}
			}
		}
		let filmID = -1;
		for (let i = 0; i < films.length; i++)
		{
			if (payload.id === films[i].id)
			{
				filmID = i;
				if (payload.title !== undefined)
				{
					films[i].title = payload.title;
				}
				if (payload.rating !== undefined)
				{
					films[i].rating = payload.rating;
				}
				if (payload.year !== undefined)
				{
					films[i].year = payload.year;
				}
				if (payload.budget !== undefined)
				{
					films[i].budget = payload.budget;
				}
				if (payload.gross !== undefined)
				{
					films[i].gross = payload.gross;
				}
				if (payload.poster !== undefined)
				{
					films[i].poster = payload.poster;
				}
				break;
			}
		}
		console.log(films);
		fs.writeFile("top250.json", JSON.stringify(films), "utf8", function () { });
		res.send(JSON.stringify(films[filmID]));
	});
});

app.post('/api/films/delete', (req, res, next) => {
	parseBodyJson(req, (err, payload) => {
		console.log(payload);
		let deletedFilmId = payload.id;
		for (let i = 0; i < films.length; i++)
		{
			if (films[i].id === deletedFilmId)
			{
				for (let j = films.indexOf(films[i]); j < films.length; j++)
				{
					films[j].position -= 1;
				}
				break;
			}
		}
		console.log(films);
		films.splice(deletedFilmId, 1);
		fs.writeFile("top250.json", JSON.stringify(films), "utf8", function () { });
		res.send(JSON.stringify(films[films.length - 1]));
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

function parseBodyJson(req, cb) {
	let body = [];

	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();
		console.log(body);
		if (body !== "")
		{
			let params = JSON.parse(body);
			cb(null, params);
		}
		else
		{
			cb(null, null);
		}

	});
}
