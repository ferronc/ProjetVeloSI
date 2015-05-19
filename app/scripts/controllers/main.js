var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

function calcIti(depart, arrive) {
	var request = {
		origin:depart,
		destination:arrive,
		travelMode: google.maps.TravelMode.BICYCLING
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
}	 

var app = angular.module('sbAdminApp');

app.controller('MainCtrl', function ($scope, $timeout) {
	$scope.data = {vitesseMax:0, distanceTotale:0, distanceMaxEntreDeuxCharges:0,dernierUtilisation:0,etatCharge:0,distanceParJour:0};
	$scope.line = {labels: ["00:00:00"],series: ['Batterie'],data: [[0]],onClick: function (points, evt) {console.log(points, evt);}};
	$scope.bar = {labels: [],series: ['Series A'],data: [[]]};

	var socket = new WebSocket ("ws://localhost:8080");

	socket.onmessage = function(e) {

        $scope.data = {vitesseMax:0, distanceTotale:0, distanceMaxEntreDeuxCharges:0,dernierUtilisation:0,etatCharge:0,distanceParJour:0};
		$scope.line = {labels: ["00:00:00"],series: ['Batterie'],data: [[0]],onClick: function (points, evt) {console.log(points, evt);}};
		$scope.bar = {labels: [],series: ['Series A'],data: [[]]};
		$scope.batteriePleine = true;
		$scope.batterieVide = true;
		$scope.arretNonVerrouille = true;
		
		$scope.data = JSON.parse(e.data);
        console.log (e);

        for (key in $scope.data.etatCharge) {
        	$scope.line.labels.push($scope.data.etatCharge[key].time); 
        	$scope.line.data[0].push($scope.data.etatCharge[key].etat);

        	if ($scope.data.etatCharge[key].etat == 100) {
        		$scope.batteriePleine = false;
        		$scope.batterieVide = true;
        	} else if ($scope.data.etatCharge[key].etat == 0){
        		$scope.batterieVide = false;
        		$scope.batteriePleine = true;
        	} else {
        		$scope.batteriePleine = true;
        		$scope.batterieVide = true;
        	}
        }

        for (key in $scope.data.distanceParJour) {
        	$scope.bar.labels.push($scope.data.distanceParJour[key].date.substring(0, 10)); 
        	$scope.bar.data[0].push($scope.data.distanceParJour[key].parcourue); 
        }
	}
	
});
