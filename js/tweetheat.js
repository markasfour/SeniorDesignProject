var keywordURL = "https://ghamaty.tech:5000/maprest/apv1/get/keywords"
var twitterURL = keywordURL + "/twitter"
var googleHotURL = keywordURL + "/google/search"
var googleSearchURL = keywordURL + "/google/hot"


var tweetheat = angular.module('tweetheat', ['ngAnimate']);

tweetheat.factory('heatFactory', function(){
  //used to get the keywords
  function getKeywords(){
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

  function getTwitterKeywords(){
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

  function getGoogleHotKeywords(){
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

  function getGoogleSearchKeywords(){
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


tweetheat.controller('heatController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactry){
  $scope.twitterKeywords      = [];
  $scope.googleHotKeywords    = [];
  $scope.googleSearchKeywords = [];

  var requestForTwitterKeywords      = heatFactory.getTwitterKeywords();
  var requestForGoogleHotKeywords    = heatFactory.getGoogleHotKeywords();
  var requestForGoogleSearchKeywords = heatFactory.getGoogleSearchKeywords();

  requestForTwitterKeywords.then( function(result) {
    console.log(result);
  });
  requestForTwitterKeywords.then( function(result) {
    console.log(result);
  });
  requestForTwitterKeywords.then( function(result) {
    console.log(result);
  });

}]);

