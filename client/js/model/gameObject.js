GAME = function(param) {
	var self = this;

	self.id = param.id;
	self.gameName = param.gameName;
	self.creatorId = param.creatorId;
	self.creatorName = param.creatorName; //Belki: Gerekmeyebilir, simdilik kalsın
	self.bombPower = param.bombPower;
	self.bombCount = param.bombCount;
	self.allDestructible = param.allDestructible;

	if (param.playersInGame != undefined) {
		self.playersInGame = param.playersInGame;
	}
	
	/*self.playerCount = self.playersInGame.size //sonra*/

	self.someoneJoined = function(player) {
		/*console.log('before someoneJoined -> ' + self.playersInGame);*/

		self.playerCount++;
		self.playersInGame[player.id] = player;

		/*console.log('after someoneJoined -> ' + self.playersInGame);*/
	}

	self.someoneLeft = function(player) {
		self.playerCount--;
		var playerId = player.id;
		delete self.playersInGame.playerId;
	}

	self.getPlayerName = function(playerId) {
		return self.playersInGame[playerId].username;
	}

	return self;
}