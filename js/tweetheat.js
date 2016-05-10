var keywordURL = "https://ghamaty.tech/maprest/apv1/get/keywords"
var twitterURL = keywordURL + "/twitter"
var googleHotURL = keywordURL + "/google/search"
var googleSearchURL = keywordURL + "/google/hot"

console.log("urls are ", twitterURL, googleHotURL, googleSearchURL)


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

  return {
    getKeywords:getKeywords,
    getTwitterKeywords:getTwitterKeywords,
    getGoogleSearchKeywords:getGoogleSearchKeywords,
    getGoogleHotKeywords:getGoogleHotKeywords
  }

});

tweetheat.controller('twitterController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.twitterKeywords = [{name: 'Lindsey Grahm'}, {name: 'Kalin'}, {name: 'Dangerous Donald'}, {name: 'Damien Sandow'}, {name: 'Battlefield 1'}];

  var requestForTwitterKeywords = heatFactory.getTwitterKeywords($http);

  requestForTwitterKeywords.then( function(result) {
    console.log(result);
  });

}]);

tweetheat.controller('googleHotController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.googleHotKeywords = ['GTX 1080', 'Mothers Day', 'Harry Styles', 'Cavs', 'Battlefield 1'];

  var requestForGoogleHotKeywords = heatFactory.getGoogleHotKeywords($http);

  requestForGoogleHotKeywords.then( function(result) {
    console.log(result);
  });
}]);

tweetheat.controller('googleSearchController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.googleSearchKeywords = ['facebook', 'youtube', 'google', 'kentucky', 'amazon'];

  var requestForGoogleSearchKeywords = heatFactory.getGoogleSearchKeywords($http);
  console.log("inside search controller");
  $scope.print("test");
  requestForGoogleSearchKeywords.then( function(result) {
    $scope.print(result);
    console.log("googlesearch keywords are ", result);
  });

}]);



