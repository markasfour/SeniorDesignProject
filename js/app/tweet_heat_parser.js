
/*
	Convert from the data we get 

*/

function parseData(toParse){
  var parsed = [];
  for (i = 0; i < toParse.length; i++){
    var items = toParse[i].split("|")
    parsed.push( {"keyword":items[0],
                 "timestamp":items[1],
                 "origin":items[2],
                 "state":items[3],
                 "count":items[4]})
  }
  return parsed;
}


function set_colors(max, min, color_template) {
	if (color_template == "google") {
		var range = max - min;
		range = range / 7;
		d1g = max - range;
		d2g = max - (2 * range);
		d3g = max - (3 * range);
		d4g = max - (4 * range);
		d5g = max - (5 * range);
		d6g = max - (6 * range);
		d7g = max - (7 * range);
	}
	else if (color_template == "twitter") {
		var range = max - min;
		range = range / 7;
		d1t = max - range;
		d2t = max - (2 * range);
		d3t = max - (3 * range);
		d4t = max - (4 * range);
		d5t = max - (5 * range);
		d6t = max - (6 * range);
		d7t = max - (7 * range);
	}
}


/*
	toCalc should be parsed after filtering
	Convert from our table to average weights per state
*/
function getWeights(toCalc, color_template){
	var mapCount   = {};
	var mapWeights = {};
	var max = 0;
	var min = 101;
	for (i = 0; i < toCalc.length; i ++){
		/* check to see if it is initialized*/
		if(mapWeights.hasOwnProperty(toCalc[i].state)){
			mapWeights[toCalc[i].state]	= mapWeights[toCalc[i].state] + parseInt(toCalc[i].count);
			mapCount[toCalc[i].state]	= mapCount[toCalc[i].state] + 1;
		} else {
			mapWeights[toCalc[i].state]	= parseInt(toCalc[i].count);
			mapCount[toCalc[i].state]	= 1;	
		}
	}
	
	/* now calc the averages*/
	for (var state in mapWeights) {
		if(mapWeights.hasOwnProperty(state)){
			mapWeights[state] = mapWeights[state] / mapCount[state]	;
			if (mapWeights[state] > max) {
				max = mapWeights[state];
			}
			if (mapWeights[state] < min) {
				min = mapWeights[state];
			}
		}
	}
	if (color_template == "twitter") {
		console.log("max = ", max);
		console.log("min = ", min);
	}

	//set color limits based off of max and min values
	color_template == set_colors(max, min, color_template);

	//console.log("MapWeights are ", mapWeights)
	
	return mapWeights;
}

/*
	google weights should be a map of state abbrieviation and the average weights

*/

function setMapData(new_weights, mapDensities){
  /*For item in our state*/
  //console.log("NEW WEIGHTS", new_weights);
  //console.log("MAP DENSITIES", mapDensities);
  
  for(i = 0; i < mapDensities["features"].length; i++){
    
    //console.log(mapDensities["features"][i]["properties"]["name"]);
    //console.log(stateTranslationFA[mapDensities["features"][i]["properties"]["name"]]);

    /*var abb = stateTranslationFA[mapDensities["features"][i]["properties"]["name"]];*/
	
	  /* If we find new weight set it to that otherwise set to 0*/
	if(new_weights.hasOwnProperty(mapDensities["features"][i]["properties"]["name"])){
		//console.log("setting property", mapDensities["features"][i]["properties"]["name"], new_weights[mapDensities["features"][i]["properties"]["name"]]);
		mapDensities["features"][i]["properties"]["density"] = new_weights[mapDensities["features"][i]["properties"]["name"]];
	} else if (new_weights.hasOwnProperty(stateTranslationFA[mapDensities["features"][i]["properties"]["name"]])) {
		mapDensities["features"][i]["properties"]["density"] = new_weights[stateTranslationFA[mapDensities["features"][i]["properties"]["name"]]];	
		//console.log(new_weights[stateTranslationFA[mapDensities["features"][i]["properties"]["name"]]]);
	} else {
		mapDensities["features"][i]["properties"]["density"] = 0;
		console.log("HERE");
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
  states_data_twitter = L.geoJson(TwitterStatesData, {
  	style: style2,
  	onEachFeature: onEachFeature
  });
  geo_json = states_data_twitter.addTo(map);
	
}