(function () {

	var bookmarkTools = bookmarkToolsClosure();
	var drawItems = drawItemsClosure();

	$("#join-bookmark-btn").click(function(event) {
		event.preventDefault();

		bookmarkTools.restart();

		var json1 = JSON.parse($("#bookmark1").val());
		var json2 = JSON.parse($("#bookmark2").val());

		// console.log(json1);
		// console.log(json2);

		_.each(json1.portals, function (elem) {
			bookmarkTools.addFolder(elem);
		});
		_.each(json2.portals, function (elem) {
			bookmarkTools.addFolder(elem);
		});

		$("#bookmarkjoin").val(JSON.stringify(bookmarkTools.buildJoined()));
	});

	$("#join-draw-btn").click(function(event) {
		event.preventDefault();

		drawItems.restart();

		var json1 = JSON.parse($("#draw1").val());
		var json2 = JSON.parse($("#draw2").val());

		// console.log(json1);
		// console.log(json2);

		drawItems.addJson(json1);
		drawItems.addJson(json2);

		$("#drawjoin").val(JSON.stringify(drawItems.getResult()));
	});


	function bookmarkToolsClosure() {
		var folders = [];
		var jsonRes = {
			maps: {idOthers: {label:"Others",state:1,bkmrk:{}}},
			portals: {}
		};

		return {
			restart: restart,
			addFolder: addFolder,
			buildJoined: buildJoined
		};

		function restart() {
			folders = [];
			jsonRes = {
				maps: {idOthers: {label:"Others",state:1,bkmrk:{}}},
				portals: {}
			};
		}

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

		function buildJoined() {
			_.each(folders, function (folder) {
				if(folder.label == "Others")
					jsonRes.portals["idOthers"] = folder;
				else
					jsonRes.portals[idGenerator()] = folder;
			});

			return jsonRes;
		}
	}

	function drawItemsClosure() {
		var resp = [];
		
		return {
			restart: restart,
			addJson: addJson,
			getResult: getResult
		};

		function restart() {
			resp = [];
		}

		function addJson(json) {
			_.each(json, function (marker) {
				var duplicate = _.find(resp, function(mrk) {
					return mrk.color == marker.color
						&& mrk.latLng.lat == marker.latLng.lat
						&& mrk.latLng.lng == marker.latLng.lng;
				});

				if(!duplicate)
					resp.push(marker);
			})
		}
		function getResult() {
			return resp;
		}
	}

})();