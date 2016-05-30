//TIME SLIDER
var timeSlider = document.getElementById('time-range');
var times = [0, 4];

noUiSlider.create(timeSlider, {
	start: [times[0], times[1]],
	connect: true,
	step: 1,
	direction: 'rtl',
	range: {
		'min': [ 0 ],
		'max': [ 7 ]
	}
});

var timeValues = [document.getElementById('time-range-value1'), document.getElementById('time-range-value2')];

timeSlider.noUiSlider.on('update', function( values, handle ) {
		timeValues[handle].innerHTML = values[handle];
		times[handle] = values[handle];
		//console.log("times ", times);
});
