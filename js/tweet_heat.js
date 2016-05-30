var baseURL = "https://ghamaty.tech/maprest/apv1/get"

var keywordURL = baseURL + "/keywords"
var twitterURL = keywordURL + "/twitter"
var googleHotURL = keywordURL + "/google/search"
var googleSearchURL = keywordURL + "/google/hot"

var dataURL = baseURL + "/data"
var googleDataURL = dataURL + "/google/" + earliest_date + "/" + oldest_date;
var twitterDataURL = dataURL + "/twitter/" + earliest_date + "/" + oldest_date;

console.log("urls are ", twitterURL, googleHotURL, googleSearchURL, googleDataURL);

var tweetheat = angular.module('tweetheat', ['ngAnimate', 'rzModule',  'ngRoute']);

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
    var url = googleDataURL;  
    return $http({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
      headers: {'Accept': 'application/json'}
    }).then(function (result) {
      return result.data;
    });
  }
  
  function getTwitterData($http){
    var url = twitterDataURL;  
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
    getGoogleData:getGoogleData,
    getTwitterData:getTwitterData
  }

});



tweetheat.controller('timeSliderController', ['$scope', '$rootScope',  
                                        function($scope,$rootScope){
	$scope.slider = {
	  min: 0,
	  max: 3,
	  options: {
		floor: 0,
		ceil: 31
	  }
	};	
	
	$scope.$watch('[slider.min, slider.max]', function() {
    console.log("watch went off  " + $scope.slider.min + " | " + $scope.slider.max);
    
    $rootScope.start_date = get_start_day(parseInt($scope.slider.min));
		$rootScope.end_date = get_end_day(parseInt($scope.slider.max));
			
		//console.log("set dates from " + $scope.slider.min + " | " + $scope.slider.max);
		//console.log("set dates to " + $rootScope.start_date + " | " + $rootScope.end_date);
		
		
	});
}]);





tweetheat.controller('twitterController', ['$scope', '$rootScope', 
                                        function($scope,$rootScope){
  $scope.maxKeywords = 100;
  $scope.loading = true;
                                          
  $rootScope.$watch('twitter_data', function() {
    /*twitter data loaded*/
    if($rootScope.twitter_data){
      $scope.keywords = [];
     
	    console.log("start and end " + $rootScope.start_date + " | " + $rootScope.end_date)
    
      /*each key is a keyword and its value is true false */
      for(var i = 0 ; i < $rootScope.twitter_data.length; i++){
        /* check for within the time range */
        
        console.log("checking " + $rootScope.start_date + " < "
                    + to_date($rootScope.twitter_data[i]['timestamp']) + " > "
                    + $rootScope.end_date);
        if(to_date($rootScope.twitter_data[i].timestamp) < $rootScope.start_date
		    && to_date($rootScope.twitter_data[i].timestamp) > $rootScope.end_date ){
			
          //console.log("checking " + $rootScope.twitter_data[i]['timestamp']);
          $scope.selection.push({keyword : $rootScope.twitter_data[i]['keyword'], selected : true} );
        }
      }
      loading = false;
      //console.log("selection is ", $scope.selection)
    }
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


tweetheat.controller('mapController', ['$scope', '$rootScope', '$http', '$q', 'heatFactory', 
                                        function($scope, $rootScope, $http,$q, heatFactory){
  $scope.loading = true;
  $scope.google_loading = true;
  $scope.twitter_loading = true;
                                          
  var requestForGoogleData = heatFactory.getGoogleData($http);
  requestForGoogleData.then( function(result) {
    $rootScope.google_data = parseData(result.result);
	  $scope.google_weights = getWeights($rootScope.google_data, "google");
    //console.log("setting google map data...");
    setMapData($scope.google_weights, GoogleStatesData);
    $scope.google_loading = false;
    //console.log(GoogleStatesData);
	});             
                                          
  var requestForTwitterData = heatFactory.getTwitterData($http);
  requestForTwitterData.then( function(result) {
    $rootScope.twitter_data = parseData(result.result);
	  $scope.twitter_weights = getWeights($rootScope.twitter_data, "twitter");
    //console.log("setting twitter map data...");
    setMapData($scope.twitter_weights, TwitterStatesData);
    $scope.twitter_loading = false;
    //console.log(TwitterStatesData);
	});
  
                                          
  $scope.$watch('[twitter_loading,google_loading]', function() {
    //console.log("twitter_loading changed!");
    if(!$scope.google_loading && !$scope.twitter_loading){
      //console.log("setting loading to false");
      $scope.loading = false;
    }
    
  });

}]);

