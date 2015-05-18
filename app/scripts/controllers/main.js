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
	$scope.data = {vitesseMax:0, distanceTotale:0, distanceMaxEntreDeuxCharges:0,dernierUtilisation:0,etatCharge:0};
	$scope.line = {labels: [],series: ['Batterie'],data: [[]],onClick: function (points, evt) {console.log(points, evt);}};
	$scope.bar = {labels: [],series: ['Series A'],data: [[]]};

	var socket = new WebSocket ("ws://localhost:8080");

	socket.onmessage = function(e) {

        $scope.data = {vitesseMax:0, distanceTotale:0, distanceMaxEntreDeuxCharges:0,dernierUtilisation:0,etatCharge:0};
		$scope.line = {labels: [],series: ['Batterie'],data: [[]],onClick: function (points, evt) {console.log(points, evt);}};
		$scope.bar = {labels: [],series: ['Series A'],data: [[]]};

		$scope.data = JSON.parse(e.data);
        console.log (e);

        for (key in $scope.data.etatCharge) {
        	console.log($scope.data.etatCharge[key]);
        	$scope.line.labels.push($scope.data.etatCharge[key].etat); 
        	$scope.line.data[0].push($scope.data.etatCharge[key].time); 
        }
	}

	$scope.batterieVide = {data : true}; // true = caché false = apparait
	$scope.arretNonVerrouille = {data : true};
});
