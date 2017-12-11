function Player (color, positionX, positionY) {
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.itemList = [];
    this.bombPower = 1;
    this.bombCount = 1; //How many bombs a player can put
}

function getColor() {
    return this.color; 
};

function getPositionX() {
    return this.positionX;
};

function getPositionY() {
    return this.positionY;
};

function getItemList() {
    return this.itemList;
};

function addItem(item) {
    this.itemList.push(item);
};

