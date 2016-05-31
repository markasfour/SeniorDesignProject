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

tweetheat.filter("dateRange", function() {
  return function(items, start_date, end_date){
    //console.log("ranging from " + start_date+ " to " + end_date);
   
    
    var result = [];        
    for (var i=0; i<items.length; i++){
      
      var date_f = to_date(items[i].timestamp),
          date_t = to_date(items[i].timestamp);
      //console.log("in range " + date_f + " | " + date_t);
      
      if (date_f > start_date && date_t < end_date)  {
        
      //console.log("SUCCESS!" );
        result.push(items[i]);
      } else {
        items[i]["selected"] = false;
      }
    }            
    return result;
                       
  }
  
});

tweetheat.controller('timeSliderController', ['$scope', '$rootScope',  
                                        function($scope,$rootScope){
	$scope.slider = {
	  min: 0,
	  max: 14,
	  options: {
		floor: 0,
		ceil: 14
	  }
	};	
	
	$scope.$watch('[slider.min, slider.max]', function() {
    console.log("watch went off  " + $scope.slider.min + " | " + $scope.slider.max);
    
    $rootScope.start_date = get_new_day(parseInt($scope.slider.max));
		$rootScope.end_date = get_new_day(parseInt($scope.slider.min));
			
		//console.log("set dates from " + $scope.slider.min + " | " + $scope.slider.max);
		//console.log("set dates to " + $rootScope.start_date + " | " + $rootScope.end_date);
	});
}]);

 /**
   * filter for selection
   */
  tweetheat.filter('keywordSelection', ['filterFilter', function (filterFilter) {
    return function keywordSelection(input, prop) {
      return filterFilter(input, { selected: true }).map(function (keyword) {
        return keyword[prop];
      });
    };
  }]);

tweetheat.controller('keywordsController', ['$scope', '$rootScope', 
                                        function($scope,$rootScope){
  $scope.maxKeywords = 100;
  $scope.loading = true;
  $scope.loading_twitter = true;
  $scope.loading_google = true;
                                          
  $scope.keywords_twitter = [];
  $scope.keywords_google_search = [];
  $scope.keywords_google_hot = [];
                                          
  /*after this keywords_twitter keywords_google_search and keywords_google_hot are set*/                          
  $rootScope.$watch('twitter_data', function(){
    //If we need to load twitter and data has been changed
    if($rootScope.twitter_data){
      var tmp_data = $scope.twitter_data;
      var tmp_keywords_twitter = [];
      var tmp_keywords_google_search = [];
      var tmp_keywords_google_hot = [];
      
      /*get a list of keywords from twitter*/
      for(var i = 0; i< tmp_data.length; i++){
        var row = tmp_data[i];
        
        if(tmp_data[i].origin == "Twitter Trends"){
          tmp_keywords_twitter.push(row);
        } else if(tmp_data[i].origin == "Google Search Trends"){
          tmp_keywords_google_search.push(row);
        } else {
          tmp_keywords_google_hot.push(row);
        }
      }
                            
      $scope.keywords_twitter = tmp_keywords_twitter;
      $scope.keywords_google_search = tmp_keywords_google_search;
      $scope.keywords_google_hot = tmp_keywords_google_hot;
      //console.log($scope.keywords_google_search);
    }
  });
                                          
  // selected keywords
  $scope.selectionKeywordsTwitter = [];
  $scope.selectionKeywordsHot = [];
  $scope.selectionKeywordsSearch = [];
  //$scope.selection = [];
    
  // helper method
  $scope.selectedKeywordsTwitter = function selectedKeywordsTwitter() {
    return filterFilter($scope.keywords_twitter, { selected: true });
  };
  $scope.selectedKeywordsHot = function selectedKeywordsHot() {
    return filterFilter($scope.keywords_google_hot, { selected: true });
  };
  $scope.selectedKeywordsSearch = function selectedKeywordsSearch() {
    return filterFilter($scope.keywords_google_search, { selected: true });
  };
                                          
  //$rootScope.$watch('twitter_data', function(){
    //console.log("twitter_data is ", $rootScope.twitter_data);
  //});                                      
  $scope.$watch('selection', function(){
    console.log("selection is ", $scope.selection);
  });
    
  // watch keywords for changes
  $scope.$watch('keywords_twitter|filter:{selected:true}', function (nv) {
    $scope.selectionKeywordsTwitter = nv.map(function (keywords_twitter) {
      return keywords_twitter.keyword;
   });
  }, true);
  $scope.$watch('keywords_google_search|filter:{selected:true}', function (nv) {
    $scope.selectionKeywordsHot = nv.map(function (keywords_google_search) {
      return keywords_google_search.keyword;
   });
  }, true);
  $scope.$watch('keywords_google_hot|filter:{selected:true}', function (nv) {
    $scope.selectionKeywordsSearch = nv.map(function (keywords_google_hot) {
      return keywords_google_hot.keyword;
   });
  }, true);
                                          
  $scope.$watch('[selectionKeywordsTwitter.length,selectionKeywordsHot.length,selectionKeywordsSearch.length]', function(){
    if($scope.selectionKeywordsTwitter && $scope.selectionKeywordsHot && $scope.selectionKeywordsSearch){
      $rootScope.selection =  $scope.selectionKeywordsTwitter.concat($scope.selectionKeywordsHot).concat($scope.selectionKeywordsSearch);
      console.log("Selection is ", $rootScope.selection);
    }
  });
 
  
}]);

tweetheat.controller('mapController', ['$scope', '$rootScope', '$http', '$q', 'heatFactory', 
                                        function($scope, $rootScope, $http,$q, heatFactory){
  $scope.loading = true;
  $scope.google_loading = true;
  $scope.twitter_loading = true;
                                          
  /*var requestForGoogleData = heatFactory.getGoogleData($http);
  requestForGoogleData.then( function(result) {
    $rootScope.google_data = parseData(result.result);
	  $scope.google_weights = getWeights($rootScope.google_data, "google");
    //console.log("setting google map data...");
    setMapData($scope.google_weights, GoogleStatesData);
    $scope.google_loading = false;
    //console.log(GoogleStatesData);
	});   */          
   $scope.google_loading = false;
                                          
                                          
  var requestForTwitterData = heatFactory.getTwitterData($http);
  requestForTwitterData.then( function(result) {
    $rootScope.twitter_data = parseData(result.result);
	  //$scope.twitter_weights = getWeights($rootScope.twitter_data, "twitter");
    //console.log("setting twitter map data...");
    //setMapData($scope.twitter_weights, TwitterStatesData);
    $scope.twitter_loading = false;
    //console.log(TwitterStatesData);
	});
  
                                          
  // watch the loading and changes in selection and min_max
  $rootScope.$watch('[start_date, end_date, selection.length]', function(){
    //console.log("new Value", newValue);
    //console.log("old Value", oldValue);
    if(!$scope.twitter_loading)
    {
      //console.log("in watch start end, selection",$rootScope.twitter_data);
      var tmp_data = $rootScope.twitter_data
      //var tmp_selection = $rootScope.selection  


      if(tmp_data && $rootScope.start_date 
         && $rootScope.end_date)
      {
        console.log("setting twitter map data...");
        setMapData(getWeights(tmp_data, "twitter"), TwitterStatesData);
      }
    }
  });
                                          
  $scope.$watch('[twitter_loading,google_loading]', function() {
    //console.log("twitter_loading changed!");
    if(!$scope.google_loading && !$scope.twitter_loading){
      //console.log("setting loading to false");
      $scope.loading = false;
    }
    
  });

}]);

