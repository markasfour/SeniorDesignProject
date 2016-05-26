
/*
	Convert from the data we get 

*/

function parseGoogleData(toParse){
  var parsed = [];
  for (i = 0; i < toParse.length; i++){
    var items = toParse[i].split("|")
    parsed.push( {"keyword":items[0],
                 "timestamp":items[1],
                 "origin":items[2],
                 "state":items[3],
                 "google_num":items[4]})
  }
  return parsed;
}





/*
	toCalc should be parsed after filtering
	Convert from our table to average weights per state
*/
function getWeights(toCalc){
	var mapCount   = {};
	var mapWeights = {};
	
	for (i = 0; i < toCalc.length; i ++){
		/* check to see if it is initialized*/
		if(mapWeights.hasOwnProperty(toCalc[i].state)){
			mapWeights[toCalc[i].state]	= mapWeights[toCalc[i].state] + parseInt(toCalc[i].google_num);
			mapCount[toCalc[i].state]	= mapCount[toCalc[i].state] + 1;
		} else {
			mapWeights[toCalc[i].state]	= parseInt(toCalc[i].google_num);
			mapCount[toCalc[i].state]	= 1;
		}
	}
	
	/* now calc the averages*/
	for (var state in mapWeights) {
		if(mapWeights.hasOwnProperty(state)){
			mapWeights[state] = mapWeights[state] / mapCount[state]	;
		}
	}
	
	console.log("MapWeights are ", mapWeights)
	
	return mapWeights;
}

/*
	google weights should be a map of state abbrieviation and the average weights

*/

function setMapData(new_weights, mapDensities){
	console.log("new weights ", new_weights);
  /*For item in our state*/
  for(i = 0; i < mapDensities["features"].length; i++){
    /*var abb = stateTranslationFA[mapDensities["features"][i]["properties"]["name"]];*/
	
	  /* If we find new weight set it to that otherwise set to 0*/
	if(new_weights.hasOwnProperty(mapDensities["features"][i]["properties"]["name"])){
		console.log("setting property", mapDensities["features"][i]["properties"]["name"], new_weights[mapDensities["features"][i]["properties"]["name"]]);
		mapDensities["features"][i]["properties"]["density"] = new_weights[mapDensities["features"][i]["properties"]["name"]];
	} else {
		mapDensities["features"][i]["properties"]["density"] = 0;
	}
  }
	
  //google
  map.removeLayer(states_data_google);
  states_data_google = L.geoJson(GoogleStatesData, {
    style: style1,
    onEachFeature: onEachFeature
  });
  geo_json = states_data_google.addTo(map);

	
  //twitter
  map.removeLayer(states_data_twitter);
  //states_data_twitter = L.geoJson(TwitterStatesData, {
  //	style: style2,
  //	onEachFeature: onEachFeature
  //});
  geo_json = states_data_twitter.addTo(map);
	
}