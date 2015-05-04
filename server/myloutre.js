var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Création de la connexion vers la base de données
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {

	var connection = mysql.createPool({connectionLimit : 100, host : 'localhost', database : 'LOUTRE', user : 'root', password : 'root'});
	
	connection.query('SELECT * FROM Etat', function(err, rows, fields) { if (err) throw err; socket.emit('etat', rows); });

	connection.query('SELECT * FROM Distance', function(err, rows, fields) { if (err) throw err; socket.emit('distance', rows); });

	connection.query('SELECT * FROM Batterie', function(err, rows, fields) { if (err) throw err; socket.emit('batterie', rows); });

});

server.listen(8080);



 

 
