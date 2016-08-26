var _ = require("underscore");

var json1 = require("./json1.json");
var json2 = require("./json2.json");

var folders = [];

var jsonRes = {
	maps: {idOthers: {label:"Others",state:1,bkmrk:{}}},
	portals: {}
};

_.each(json1.portals, function (elem) {
	addFolder(elem);
});
_.each(json2.portals, function (elem) {
	addFolder(elem);
});

_.each(folders, function (folder) {
	if(folder.label == "Others")
		jsonRes.portals["idOthers"] = folder;
	else
		jsonRes.portals[idGenerator()] = folder;
});

console.log(JSON.stringify(jsonRes));

function idGenerator() {
	return "id" + Math.floor(Math.random() * 10000000000000);
}

function addFolder (newFolder) {
	var existentFolder = _.find(folders, function (f) {
		return f.label.toLowerCase() == newFolder.label.toLowerCase();
	});

	if(existentFolder) {
		_.each(newFolder.bkmrk, function(elem) {
			var existentPortal = _.find(existentFolder.bkmrk, function(portal) {
				return elem.guid == portal.guid;
			});
			if(!existentPortal)
				existentFolder.bkmrk[idGenerator()] = elem;
		});
	}
	else {
		folders.push(newFolder);
	}
}