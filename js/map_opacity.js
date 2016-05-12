var rangeSlider = document.getElementById('opacity-range');

noUiSlider.create(rangeSlider, {
	start: [ 0.8 ],
	connect: 'lower', 
	range: {
		'min': [ 0 ],
		'max': [ 1 ]
	}
});

var rangeSliderValueElement = document.getElementById('opacity-range-value');

rangeSlider.noUiSlider.on('update', function( values, handle ) {
		rangeSliderValueElement.innerHTML = values[handle];
		opacity = values[handle];
		map.removeLayer(states_data);
		states_data = L.geoJson(statesData, {
			style: style,
			onEachFeature: onEachFeature
		});
		geo_json = states_data.addTo(map);
});
