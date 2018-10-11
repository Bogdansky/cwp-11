let films = require("../top250.json");
const valid = require("../valid.js");
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.readFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload))
	{
		for (let i = 0; i < films.length; i++)
		{
			if (films[i].id === payload.id)
			{
				cb(null, films[i]);
			}
		}
		cb(ErrorObject);
	}
	else
	{
		cb(ErrorObject);
	}
};