//THIS DISPLAYS THE MAP
var maxBounds = L.latLngBounds(
	L.latLng(38.266224,-122.541803), //Southwest
    L.latLng(44.018501,-72.092587)  //Northeast
);	

var map = L.map('mapid', {
				'center': [0, 0],
				'zoom': 0,
				'zoomControl' : false,
				//'maxBounds': maxBounds
				minZoom: 3,
                maxZoom: 7 
                }).fitBounds(maxBounds);

//load all the maps
//default map
var default_map = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 
//geographic map

var terrain_map = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri'
});
/*var terrain_map = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
	type: 'sat',
	ext: 'jpg',
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
	subdomains: '1234'
}); */

//dark map
var dark_map = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

//grayscale map
var grayscale_map = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	maxZoom: 19,
	attribution: '<a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a>'
});

//night time map
var night_map = L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'NASA/GSFC/<a href="https://earthdata.nasa.gov">ESDIS</a>',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});

var map_list = [default_map, terrain_map, dark_map, grayscale_map, night_map];
var cur_map = 0;

//CUSTOMIZE MAP TYPE
function setMapType(map_type) {
	map.removeLayer(map_list[cur_map]);
	if (map_type === "default")  {
		cur_map = 0;
	}
	else if (map_type === "terrain") {
		cur_map = 1;
	}
	else if (map_type === "dark") {
		cur_map = 2;
	}
	else if (map_type === "grayscale") {
		cur_map = 3;
	}
	else if (map_type === "nighttime") {
		cur_map = 4;
	}
	map_list[cur_map].addTo(map);
}

function changeMapType(map_types){
	var map_type = map_types.map.value;
	setMapType(map_type);
}

var d1g = 0;
var d2g = 0;
var d3g = 0;
var d4g = 0;
var d5g = 0;
var d6g = 0;
var d7g = 0;

var google_color_R = 255;
var google_color_G = 0;
var google_color_B = 0;

// get color depending on population density value
function getColor1(d) {
	return d > d1g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', 1)' :
		   d > d2g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .875)' :
		   d > d3g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .75)' :
		   d > d4g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .625)' :
		   d > d5g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .50)' :
		   d > d6g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .375)' :
		   d > d7g ? 'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .25)' :
			         'rgba('+google_color_R+', '+google_color_G+', '+google_color_B+', .125)';	
}

var d1t = 0;
var d2t = 0;
var d3t = 0;
var d4t = 0;
var d5t = 0;
var d6t = 0;
var d7t = 0;

var twitter_color_R = 81;
var twitter_color_G = 127;
var twitter_color_B = 164;

function getColor2(d) {
	return d > d1t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', 1)' :
		   d > d2t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .875)' :
		   d > d3t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .75)' :
		   d > d4t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .625)' :
		   d > d5t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .50)' :
		   d > d6t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .375)' :
		   d > d7t ? 'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .25)' :
			         'rgba('+twitter_color_R+', '+twitter_color_G+', '+twitter_color_B+', .125)';
}

var opacity_google = 0.8;
var opacity_twitter = 0.8;
var border_opacity = 1;

function style1(feature, x) {
	return {
		weight: 2,
		opacity: border_opacity,
		color: 'white',
		dashArray: '3',
		fillOpacity: opacity_google,
		fillColor: getColor1(feature.properties.density)
	};
}

function style2(feature, x) {
	return {
		weight: 2,
		opacity: border_opacity,
		color: 'white',
		dashArray: '3',
		fillOpacity: opacity_twitter,
		fillColor: getColor2(feature.properties.density)
	};
}

var state_highlighted = 'Hover over a state';
var max_tw_weight = 1;

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                  'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
                  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 
                  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 
                  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 
                  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
                  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin',
                  'Wyoming'];

    state_highlighted = layer.feature.properties.name;
    var state_info = document.getElementById('state');
    state_info.textContent = state_highlighted;
    var index = states.indexOf(state_highlighted);
    var g_info = document.getElementById('g_info');
    g_info.textContent = 'Google: ' + (GoogleStatesData['features'][index]['properties']['density']).toFixed(2);
    var tw_info = document.getElementById('tw_info');
    tw_info.textContent = 'Twitter: ' + ((TwitterStatesData['features'][index]['properties']['density'] / max_tw_weight) * 100).toFixed(2);
}

var geojson;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	//info.update();
    state_highlighted = 'Hover over a state';
    var state_info = document.getElementById('state');
    state_info.textContent = state_highlighted;
    var g_info = document.getElementById('g_info');
    g_info.textContent = 'Google: ';
    var tw_info = document.getElementById('tw_info');
    tw_info.textContent = 'Twitter: ';
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: highlightFeature //zoomToFeature
	});
}

//load states data
//google
var states_data_google = L.geoJson(GoogleStatesData, {
	style: style1,
	onEachFeature: onEachFeature
});
geojson = states_data_google.addTo(map);
//twitter
var states_data_twitter = L.geoJson(TwitterStatesData, {
	style: style2,
	onEachFeature: onEachFeature
});
geojson = states_data_twitter.addTo(map);

map.attributionControl.addAttribution('Trend data &copy; <a href="http://trends.google.com/">Google</a> and <a href="http://twitter.com/">Twitter</a>');
