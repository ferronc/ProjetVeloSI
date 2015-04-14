var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, pseudo) {
    
	socket.on('chargerBatterie', function (message) {
        console.log(message);
    });
	
	socket.on('dechargerBatterie', function (message) {
        console.log(message);
    });

	socket.on('alarmeFinCharge', function (message) {
        console.log(message);
    });

	socket.on('distanceParcouru', function (message) {
        console.log(message);
    });

	socket.on('vitesseActuelle', function (message) {
        console.log(message);
    });	
	socket.on('etatBatterie', function (batterie) {
		socket.batterie = batterie;
        console.log("Batterie : "+socket.batterie);
    });
	socket.on('message', function (message) {
        console.log(message);
    });
	
});


server.listen(8080);