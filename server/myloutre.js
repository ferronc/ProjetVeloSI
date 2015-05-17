var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var data = {vitesseMax:"0", distanceTotale:"0", distanceMaxEntreDeuxCharges:"0",dernierUtilisation:"0",etatCharge:"0"};
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
	
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {
        	"Content-Type": "text/html", 
        	"Access-Control-Allow-Origin" : "*", 
        	"Access-Control-Allow-Methods" : "GET,PUT,POST,DELETE,OPTIONS",
        	"Access-Control-Allow-Headers" : "Content-Type, Authorization, Content-Length, X-Requested-With"
        });
    	
        res.end(content);
    });
});

// Création de la connexion vers la base de données
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {

	console.log('A new connection');

	var connection = mysql.createPool({connectionLimit : 100, host : 'localhost', database : 'loutre', user : 'root', password : 'toor'});
	data = {vitesseMax:"0", distanceTotale:"0", distanceMaxEntreDeuxCharges:"0",dernierUtilisation:"0",etatCharge:"0"};

	connection.query('SELECT vitesseMax FROM etat', function(err, rows, fields) { if (err) throw err; data.vitesseMax = rows[0].vitesseMax; socket.emit(JSON.stringify(data)); });

	connection.query('SELECT SUM(parcourue) as total FROM distance', function(err, rows, fields) { if (err) throw err; data.distanceTotale = rows[0].total; socket.emit(JSON.stringify(data)); });
	
	connection.query('SELECT * FROM batterie', function(err, rows, fields) { if (err) throw err; data.etatCharge = rows; socket.emit(JSON.stringify(data)); });

	connection.query('SELECT MAX(datetime) as dernierUtilisation FROM distance', function(err, rows, fields) { if (err) throw err; data.dernierUtilisation = rows[0].dernierUtilisation; socket.emit(JSON.stringify(data));});

});

server.listen(8080);



 

 
