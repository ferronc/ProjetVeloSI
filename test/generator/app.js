// On récupère les différentes dépendances du projet
var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var countSendEtatBat = 10;

// Création de la connexion vers la base de données
var pool = mysql.createPool({
	connectionLimit : 100,
	host : 'localhost',
	database : 'loutre',
	user : 'root',
	password : 'toor'
});

/**
 * Permet de réaliser une requête d'insertion ou d'update sur la base de données
 * @param req - La requête d'insertion ou d'update à exécuter
 */
function handle_database(req) {

    // On récupère la connexion à la base de données
    pool.getConnection(function(err,connection){
		 if (err) { console.log(err); }
		// On utilise la connexion pour réaliser une requête		
		connection.query(req, function(err, rows) {
			if (err)	{
				console.log(err);
			}else{
				//console.log(rows);
			}
		});
		
		// On libère la connexion
		connection.release();
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
		"INSERT INTO batterie (date, time, datetime, etat)" +
		" VALUES (NOW(), NOW(), NOW(), "+socket.batterie+")";
		
		if (countSendEtatBat == 0) {
			handle_database(requete);
			countSendEtatBat = 10;
		}
		else{
			countSendEtatBat--;
		}
    });

	// On récupère un évènement sur la distance parcourue
	socket.on('distanceParcourue', function (distanceParcourue) {
		socket.distanceParcourue = distanceParcourue;
        console.log("Distance parcourue : "+socket.distanceParcourue);
		
		var requete = 
		"INSERT INTO distance (date, time, datetime, parcourue)" +
		" VALUES (NOW(), NOW(), NOW(), "+socket.distanceParcourue+")";
		
		handle_database(requete);
	});
	
	// On récupère un évènement pour l'alarme de fin de charge
	socket.on('alarmeFinDeCharge', function (message) {
        console.log(message);
    });
	
	// On récupère un évènement sur les records de distance max réalisée entre deux charges
	socket.on('recordDistanceMax', function (distanceMaxEntreDeuxCharges) {
		socket.distanceMaxEntreDeuxCharges = distanceMaxEntreDeuxCharges;
		
		var requete1 = "SELECT distanceMaxEntreDeuxCharges FROM etat"
		var result1 = 0;
		
		pool.query(requete1, function(err, rows, fields) {
			if (err) {
				throw err;
			}
			result1 = rows[0].distanceMaxEntreDeuxCharges;
		});
		
		if(socket.distanceMaxEntreDeuxCharges > result1){
			var requete2 =
			"UPDATE etat SET distanceMaxEntreDeuxCharges="+socket.distanceMaxEntreDeuxCharges;
		
			handle_database(requete2);
		}
	});
	
	// On récupère un évènement sur les records de vitesse max
	socket.on('recordVitesseMax', function (vitesseMax) {
		socket.vitesseMax = vitesseMax;
		
		var requete =
		"UPDATE etat SET vitesseMax="+socket.vitesseMax;
		
		handle_database(requete);
	});
	
	// Ajouter favoris
	socket.on('ajouterFavoris', function (data) {
		var activite = ""+data.act;
		var lieu = ""+data.lie;
		
		var requete =
		"INSERT INTO favoris (activite, lieu)" +
		" VALUES (\'"+activite+"\', \'"+lieu+"\')";
		
		handle_database(requete);
	});
	
	// Ajouter historique
	socket.on('ajouterHistorique', function (data) {
		var depart = ""+data.dep;
		var arrivee = ""+data.arr;
		
		var requete =
		"INSERT INTO historique (depart, arrivee, date)" +
		" VALUES (\'"+depart+"\', \'"+arrivee+"\', NOW())";
		
		handle_database(requete);
	});
	
	// Ajouter trajet enregistré
	socket.on('ajouterTrajet', function (data) {
		var depart = ""+data.dep;
		var arrivee = ""+data.arr;
		
		var requete =
		"INSERT INTO trajet (depart, arrivee)" +
		" VALUES (\'"+depart+"\',\'"+arrivee+"\')";
		
		handle_database(requete);
	});
	
	// Ajouter déplacement
	socket.on('deplacement', function (data) {
		var latitude = data.lat;
		var longitude = data.lon;
		
		var requete =
		"INSERT INTO deplacement (latitude, longitude, date, time, datetime)" +
		" VALUES ("+latitude+", "+longitude+", NOW(), NOW(), NOW())";
		
		handle_database(requete);
	});
	
	// On récupère un évènement message pour les logs de la console
	socket.on('message', function (message) {
		console.log(message);
	});
});

server.listen(6666);