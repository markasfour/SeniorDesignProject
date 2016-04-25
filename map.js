//THIS DISPLAYS THE MAP
var maxBounds = L.latLngBounds(
	L.latLng(38.266224,-122.541803), //Southwest
    L.latLng(44.018501,-72.092587)  //Northeast
);	

var map = L.map('mapid', {
				//'center': [0, 0],
				'zoom': 0,
				'maxBounds': maxBounds
				}).fitBounds(maxBounds);

L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//THIS COLORS THE MAP	
// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
		'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
		: 'Hover over a state');
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
	return d > 1000 ? '#800026' :
		   d > 500  ? '#BD0026' :
		   d > 200  ? '#E31A1C' :
		   d > 100  ? '#FC4E2A' :
		   d > 50   ? '#FD8D3C' :
		   d > 20   ? '#FEB24C' :
		   d > 10   ? '#FED976' :
			          '#FFEDA0';
}

function style(feature) {
	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(feature.properties.density)
	};
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

geojson = L.geoJson(statesData, {
	style: style,
	onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');
