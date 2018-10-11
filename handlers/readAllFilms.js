let films = require("../top250.json");
const defaultValues = {
	"sortField": "position",
	"sortOrder": "asc"
};
let compareField = defaultValues.sortField;
let compareOrder = defaultValues.sortOrder;

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

module.exports.readAll = function(req, res, cb) {
	films.sort(compareCustom);
	console.log(films);
	cb(null, films);
};