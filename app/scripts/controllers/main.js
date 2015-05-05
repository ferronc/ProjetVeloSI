'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
var d = new Date();
var h = d.getHours();
var j = d.getDay();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function myFunction(aDate) {
	var now = new Date ();
	var tmp = now.getTime()-aDate.getTime();

	if (tmp > 24*60*60*1000) {
		return tmp+" j";
	}
	else if (tmp > 60*60*1000) {
		return tmp+" h";
	}
	else if (tmp > 60*1000) {
		return tmp+" min";
	}
	else if (tmp > 1000) {
    	return tmp+" s";
    }
   	return tmp+" ms";
}


var directionsDisplay = new google.maps.DirectionsRenderer();;
var directionsService = new google.maps.DirectionsService();
	 //console.log($scope.map);
      //directionsDisplay.setMap($scope.map);

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


angular.module('sbAdminApp').controller('MainCtrl', function ($scope, $timeout, $http) {

  	$http.get("http://localhost:8080/index.html").success(function (response) {$scope.names = response.records;});
  	console.log($scope.names);
    $scope.line = {
	    labels: [ h-6, h-5, h-4, h-3, h-2, h-1, h],
	    series: ['Batterie'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40]
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };

    $scope.bar = {
	    labels: [ weekday[1], weekday[2], weekday[3], weekday[4], weekday[5], weekday[6], weekday[0]],
		series: ['Series A'],
		data: [
		   [65, 59, 80, 81, 56, 55, 40]
		]
    };

    $scope.vitesseMax = { data : 6 };
    $scope.dTotale = { data : 50 };
    $scope.dMaxEntre2Charges = { data : 15 };
    $scope.tpsSinceLastUse = { data : myFunction(new Date (d)) };

	$scope.batterieVide = {data : true}; // true = caché false = apparait
	$scope.arretNonVerrouille = {data : true};

    //$scope.itineraire = {calcIti(new google.maps.LatLng(37.891586,-4.7844853), new google.maps.LatLng(42.356,-78.5794))};

});