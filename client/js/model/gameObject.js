GAME = function(param) {
	var self = this;

	self.id = param.id;
	self.gameName = param.gameName;
	self.creatorId = param.creatorId;
	self.creatorName = param.creatorName; //Belki: Gerekmeyebilir, simdilik kalsın
	self.bombPower = param.bombPower;
	self.bombCount = param.bombCount;
	self.allDestructible = param.allDestructible;
	self.playerCount = 0; //Gerek yok alma kalsın
	self.playersInGame = {};

	self.someoneJoined = function(player) {
		self.playerCount++;
		self.playersInGame[player.id] = player;
	}

	self.someoneLeft = function(player) {
		self.playerCount--;
		var playerId = player.id;
		delete self.playersInGame.playerId;
	}

	return self;
}