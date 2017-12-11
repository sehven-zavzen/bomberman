class Player {

	constructor(id, color, positionX, positionY) {
		this.socket = socket;
        this.color = color;
		this.positionX = positionX;
		this.positionY = positionY;
		this.itemList = [];
		this.bombPower = 1;
		this.bombCount = 1; //How many bombs a player can put
	};

	get getColor() {
		return this.color; 
    };

    get getPositionX() {
    	return this.positionX;
    };

    get getPositionY() {
    	return this.positionY;
    };

    get getItemList() {
    	return this.itemList;
    };

    addItem(item) {
    	this.itemList.push(item);
    };

}