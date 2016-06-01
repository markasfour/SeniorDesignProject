var border_toggle = document.getElementById('border-toggle');

noUiSlider.create(border_toggle, {
	orientation: "horizontal",
	connect: "lower",
	start: 1,
	step: 1,
	range: {
		'min': 0,
		'max': 1
	},
})

border_toggle.noUiSlider.on('update', function( values, handle ){
	if ( values[handle] == 1.00) {
		border_opacity = 1;	
	} else {
		border_opacity = 0;
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

});
