let films = require("../top250.json");
const valid = require("../valid.js");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload))
	{
		console.log(payload);
		let deletedFilmId = payload.id;
		let flag = false;
		for (let i = 0; i < films.length; i++)
		{
			if (films[i].id === deletedFilmId)
			{
				flag = true;
				for (let j = films.indexOf(films[i]); j < films.length; j++)
				{
					films[j].position -= 1;
				}
				break;
			}
		}
		if (flag) {
			let deletedFilm = films[deletedFilmId];
			films.splice(deletedFilmId, 1);
			fs.writeFile("top250.json", JSON.stringify(films), "utf8", () => {});
			cb(deletedFilm);
		}
		else
		{
			cb(ErrorObject);
		}
	}
	else
	{
		cb(ErrorObject);
	}
};