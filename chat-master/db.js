var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123456',
	database : 'chat'
});

connection.connect(function(err) {
	if (err) throw err;
});

/*
	object
	--------
	operation
	data
		-> insert operationı ise
			-> data.tableName
			-> data.jsonObject : Exp var post = {ip: '234', username: 'heyo', chattime: '42232', message: 'plo'};
*/
	
var db = function (object) {
	if (object.operation == "hoy") {
		callMe();
	} else if (object.operation  == "insert") {
		insertData(object.data);
	}
}

function callMe() {
	console.log("Nerdeee");
}

function insertData(data) {
	//var post = {ip: '234', username: 'heyo', chattime: '42232', message: 'plo'};
	
	connection.query('INSERT INTO ' + data.tableName + ' SET ?', data.jsonObject, function(err, result) {
      if (err) throw err;
    });
}

module.exports = db;