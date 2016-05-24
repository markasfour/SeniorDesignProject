var baseURL = "https://ghamaty.tech/maprest/apv1/get"

var keywordURL = baseURL + "/keywords"
var twitterURL = keywordURL + "/twitter"
var googleHotURL = keywordURL + "/google/search"
var googleSearchURL = keywordURL + "/google/hot"

var dataURL = baseURL + "/data"
var googledataURL = dataURL + "/google"

console.log("urls are ", twitterURL, googleHotURL, googleSearchURL, googledataURL)


var tweetheat = angular.module('tweetheat', ['ngAnimate']);

tweetheat.run(function($rootScope) {
  $rootScope.print = function(toPrint) {
    console.log(toPrint);
  }
});

tweetheat.factory('heatFactory', function(){
  //used to get the keywords
  function getKeywords( $http){
    console.log("getting from ", keywordURL);
    var url = keywordURL;  
    return $http({
      method: 'GET',
      url: url,
      headers: {'Accept': 'application/json'}
    }).then(function (result) {
      return result.data;
    });
  }

  function getTwitterKeywords($http){
    var url = twitterURL;  
    return $http({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
      headers: {'Accept': 'application/json'}
    }).then(function (result) {
      return result.data;
    });
  }

  function getGoogleHotKeywords($http){
    var url = googleHotURL;  
    return $http({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
      headers: {'Accept': 'application/json'}
    }).then(function (result) {
      return result.data;
    });
  }

  function getGoogleSearchKeywords($http){
    var url = googleSearchURL;  
    return $http({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
      headers: {'Accept': 'application/json'}
    }).then(function (result) {
      return result.data;
    });
  }

  function getGoogleData($http){
    var url = googledataURL;  
    return $http({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
      headers: {'Accept': 'application/json'}
    }).then(function (result) {
      return result.data;
    });
  }

  return {
    getKeywords:getKeywords,
    getTwitterKeywords:getTwitterKeywords,
    getGoogleSearchKeywords:getGoogleSearchKeywords,
    getGoogleHotKeywords:getGoogleHotKeywords,

    getGoogleData:getGoogleData
  }

});

tweetheat.controller('twitterController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.maxKeywords = 100;
  $scope.loading = true;
  
  var requestForTwitterKeywords = heatFactory.getTwitterKeywords($http);
  requestForTwitterKeywords.then( function(result) {
    $scope.loading = false;
    $scope.twitterKeywords = result.result;
	  
	});

}]);

tweetheat.controller('googleHotController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.maxKeywords = 100; 
  $scope.loading = true; 
  
  var requestForGoogleHotKeywords = heatFactory.getGoogleHotKeywords($http);
  requestForGoogleHotKeywords.then( function(result) {
    $scope.loading = false;
    $scope.googleHotKeywords = result.result;  
  });
}]);

tweetheat.controller('googleSearchController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.maxKeywords = 100;
  $scope.loading = true;
  
  var requestForGoogleSearchKeywords = heatFactory.getGoogleSearchKeywords($http);
  //console.log("inside search controller");
  //$scope.print("test");
  requestForGoogleSearchKeywords.then( function(result) {
    $scope.loading = false;
    $scope.googleSearchKeywords = result.result;
  });

}]);


tweetheat.controller('googleDataController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.loading = true;
  
  var requestForGoogleData = heatFactory.getGoogleData($http);
  //console.log("inside search controller");
  $scope.print("test");
  requestForGoogleData.then( function(result) {
    $scope.loading = false;
    $scope.googleSearchKeywords = result.result;
  });

}]);
