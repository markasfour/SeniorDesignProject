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

  function getTwitter(){
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

  function getGoogleHot(){
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

  function getGoogleSearch(){
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
    getKeywords:getKeywords
  }

});


tweetheat.controller('heatController', ['$scope', '$http', '$q', 'heatFactory', 
                                        function($scope,$http,$q, heatFactry){

  $scope.keywords = "";
  $scope.keywordList = [];
  
  var requestForKeywords = heatFactory.getKeywords();
  requestForKeywords.then( function(result) {
    console.log(result);
  });
}]);

