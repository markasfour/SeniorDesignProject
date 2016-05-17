var timeSlider = document.getElementById('time-range');

noUiSlider.create(timeSlider, {
	start: [1, 24],
	connect: true,
	step: 1,
	direction: 'rtl',
	range: {
		'min': [ 1 ],
		'max': [ 168 ]
	}
});

var timeValues = [document.getElementById('time-range-value1'), document.getElementById('time-range-value2')];

timeSlider.noUiSlider.on('update', function( values, handle ) {
		timeValues[handle].innerHTML = values[handle];
});
