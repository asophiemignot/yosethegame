var url 			= require('url');
var thePlayer 		= require('./utils/player.utils');
var array			= require('./utils/array.utils');
var withAttribute	= require('./utils/array.matchers');

startover = function(request, response, database) {
	var params = url.parse(request.url, true);	
	var player = database.find(params.query.login);
	if (player != undefined) {
		var level = thePlayer.currentLevel(player, database);
		if (level == database.levels[0]) {
			player.portfolio = [];
			player.server = undefined;
			database.savePlayer(player);
		} else {
			array.forEach(level.challenges, function(challenge) {
				var achievement = array.firstItemIn(player.portfolio, withAttribute.titleEqualsTo(challenge.title));
				if (achievement != undefined) {
					var index = player.portfolio.indexOf(achievement);
					player.portfolio.splice(index, 1);
				}
			});
			database.savePlayer(player);
		}
	}
	response.end();
}

module.exports = startover;