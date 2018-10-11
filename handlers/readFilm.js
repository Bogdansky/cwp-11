let films = require("../top250.json");

module.exports.readFilm = function(req, res, cb) {
	console.log(req.params[id]);
	cb(null, films);
};