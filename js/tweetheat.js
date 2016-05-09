var keywordURL = "https://ghamaty.tech:5000/maprest/apv1/get/keywords"
var twitterURL = keywordURL + "/twitter"
var googleHotURL = keywordURL + "/google/search"
var googleSearchURL = keywordURL + "/google/hot"


var tweetheat = angular.module('tweetheat', ['ngAnimate']);

tweetheat.run(function($rootScope) {
  $rootScope.print = function(toPrint) {
    console.log(toPrint);
  }
});

tweetheat.factory('heatFactory', function(){
  //used to get the keywords
  function getKeywords( $http){
    var url = keywordURL;  
    return $http({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
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
  $scope.twitterKeywords = [];

  var requestForTwitterKeywords = heatFactory.getTwitterKeywords($http);

  requestForTwitterKeywords.then( function(result) {
    console.log(result);
  });

}]);

tweetheat.controller('googleHotController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.googleHotKeywords = [];

  var requestForGoogleHotKeywords = heatFactory.getGoogleHotKeywords($http);

  requestForGoogleHotKeywords.then( function(result) {
    console.log(result);
  });
}]);

tweetheat.controller('googleSearchController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactory){
  $scope.googleSearchKeywords = [];

  var requestForGoogleSearchKeywords = heatFactory.getGoogleSearchKeywords($http);
  console.log("inside search controller")
  $scope.print("test")
  requestForGoogleSearchKeywords.then( function(result) {
    $scope.print(result)
    console.log(result);
  });

}]);



