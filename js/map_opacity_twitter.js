var opacitySliderTwitter = document.getElementById('opacity-range-twitter');

noUiSlider.create(opacitySliderTwitter, {
	start: [ 0.8 ],
	connect: 'lower', 
	range: {
		'min': [ 0 ],
		'max': [ 1 ]
	}
});

var opacitySliderTwitterValueElement = document.getElementById('opacity-range-value-twitter');

opacitySliderTwitter.noUiSlider.on('update', function( values, handle ) {
		opacitySliderTwitterValueElement.innerHTML = values[handle];
		opacity_twitter = values[handle];
		
		//google
		map.removeLayer(states_data_google);
		//states_data_google = L.geoJson(GoogleStatesData, {
		//	style: style1,
		//	onEachFeature: onEachFeature
		//});
		geo_json = states_data_google.addTo(map);

		//twitter
		map.removeLayer(states_data_twitter);
		states_data_twitter = L.geoJson(TwitterStatesData, {
			style: style2,
			onEachFeature: onEachFeature
		});
		geo_json = states_data_twitter.addTo(map);	
});
