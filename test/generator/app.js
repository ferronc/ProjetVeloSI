// On récupère les différentes dépendances du projet
var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

// Création de la connexion vers la base de données
var connection = mysql.createPool({
	connectionLimit : 100,
	host : 'localhost',
	database : 'LOUTRE',
	user : 'root',
	password : 'root'
});

/**
 * Permet de réaliser une requête sur la base de données
 * @param req - La requête à exécuter
 * @param res - Le résultat suite à l'exécution de la requête
 */
function handle_database(req,res) {
   
    // On récupère la connexion à la base de données
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
	   // On exécute la requête
        connection.query(req ,function(err,rows){
			// On rend la main si il n'y a pas eu d'erreur
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
    
	// On récupère un évènement sur l'état de la batterie
	socket.on('etatBatterie', function (batterie) {
		socket.batterie = batterie;
        console.log("Batterie : "+socket.batterie);
		
		var requete = 
		"INSERT INTO Batterie (etat, date)" +
		"VALUES ("+socket.batterie+", NOW())";
		
		handle_database(requete,result);
    });

	// On récupère un évènement sur la distance parcourue
	sockets.on('distanceParcourue', function (distanceParcourue) {
		socket.distanceParcourue = distanceParcourue;
        console.log("Distance parcourue : "+socket.distanceParcourue);
		
		var requete = 
		"INSERT INTO Distance (parcourue, date)" +
		"VALUES ("+socket.distanceParcourue+", NOW())";
		
		handle_database(requete,result);
	});
	
	// On récupère un évènement pour l'alarme de fin de charge
	socket.on('alarmeFinDeCharge', function (message) {
        console.log(message);
    });
	
	// On récupère un évènement sur les records réalisés
	sockets.on('recordDistanceTotale', function (distanceTotale) {
		socket.distanceTotale = distanceTotale;
		
		var requete =
		"UPDATE Etat SET distanceTotal="+socket.distanceTotale;
		
		handle_database(requete,result);
	});
	
	// On récupère un évènement sur les records de vitesse max
	socket.on('recordVitesseMax', function (vitesseMax) {
		socket.vitesseMax = vitesseMax;
		
		var requete =
		"UPDATE Etat SET vitesseMax="+socket.vitesseMax;
		
		handle_database(requete,result);
	}
	
	// On récupère un évènement message pour les logs de la console
	sockets.on('message', function (message) {
		console.log(message);
	});
});


server.listen(8080);