GAME = function(param) {
	var self = this;

	self.id = param.id;
	self.gameName = param.gameName;
	self.creatorId = param.creatorId;
	self.creatorName = param.creatorName; //Belki: Gerekmeyebilir, simdilik kalsın
	self.bombPower = param.bombPower;
	self.bombCount = param.bombCount;
	self.allDestructible = param.allDestructible;

	return self;
}