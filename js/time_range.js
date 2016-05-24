//GET EARLIEST AND OLDEST DATE RANGE
//EARLIEST
var a = new Date(Date.now());
var year = a.getFullYear();
var month = a.getMonth();
var date = a.getDate();
var earliest_date = year + '-' + month + '-' + date;
console.log(earliest_date);

//OLDEST
var b = new Date();
b.setDate(b.getDate() - 7);
var year = b.getFullYear();
var month = b.getMonth();
var date = b.getDate();
var oldest_date = year + '-' + month + '-' + date;
console.log(oldest_date);

//TIME SLIDER
var timeSlider = document.getElementById('time-range');

noUiSlider.create(timeSlider, {
	start: [0, 4],
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
});
