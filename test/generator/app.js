var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

// Création de la connexion vers la base de données
var connection = mysql.createPool({
	connectionLimit : 100,
	host : 'localhost',
	database : 'projetvelo',
	user : 'root',
	password : 'toor'

});

function handle_database(req,res) {
   
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        connection.query(req ,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }          
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
}

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, result) {
    
	socket.on('etatBatterie', function (batterie) {
		socket.batterie = batterie;
        console.log("Batterie : "+socket.batterie);
		
		var requete = 
		"INSERT INTO Batterie (etat, date)" +
		"VALUES ("+socket.batterie+", NOW())";
		
		handle_database(requete,result);
    });

	sockets.on('distanceParcourue', function (distanceParcourue) {
		socket.distanceParcourue = distanceParcourue;
        console.log("Distance parcourue : "+socket.distanceParcourue);
		
		var requete = 
		"INSERT INTO Distance (parcourue, date)" +
		"VALUES ("+socket.distanceParcourue+", NOW())";
		
		handle_database(requete,result);
	});
	
	sockets.on('record', function (message) {
	
	
	
	});
	
	sockets.on('message', function (message) {
		console.log(message);
	});
});


server.listen(8080);