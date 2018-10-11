let films = require("../top250.json");
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

module.exports.readAll = function(req, res, cb) {
	films.sort(compareCustom);
	console.log("a" + JSON.stringify(films));
	cb(null, films);
};