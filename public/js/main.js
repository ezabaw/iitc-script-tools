(function () {

	var bookmarkTools = bookmarkToolsClosure();

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

})();