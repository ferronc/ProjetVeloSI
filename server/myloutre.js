var mysql = require('mysql');

var data = {
	vitesseMax:"0", 
	distanceTotale:"0", 
	distanceMaxEntreDeuxCharges:"0",
	dernierUtilisation:"0",
	etatCharge:"0"
};

var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080}); 


wss.on('connection', function (ws) {

	console.log('A new connection');
	
	var connection = mysql.createPool({connectionLimit : 100, host : 'localhost', database : 'loutre', user : 'root', password : 'toor'});
	data = {vitesseMax:"0", distanceTotale:"0", distanceMaxEntreDeuxCharges:"0",dernierUtilisation:"0",etatCharge:"0"};

	connection.query('SELECT vitesseMax FROM etat', function(err, rows, fields) { if (err) throw err; data.vitesseMax = rows[0].vitesseMax; ws.send(JSON.stringify(data)); });

	connection.query('SELECT SUM(parcourue) as total FROM distance', function(err, rows, fields) { if (err) throw err; data.distanceTotale = rows[0].total; ws.send(JSON.stringify(data)); });
	
	connection.query('SELECT * FROM batterie', function(err, rows, fields) { if (err) throw err; data.etatCharge = rows; ws.send(JSON.stringify(data)); });

	connection.query('SELECT MAX(datetime) as dernierUtilisation FROM distance', function(err, rows, fields) { if (err) throw err; data.dernierUtilisation = rows[0].dernierUtilisation; ws.send(JSON.stringify(data)); });
});
 

 
