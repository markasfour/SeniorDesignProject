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

/* http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript */
function get_start_day(){
	var start_date = new Date();
	start_date.setDate(start_date.getDate()+times[0])
	var dd = start_date.getDate();
	var mm = start_date.getMonth()+1; //January is 0!
	var yyyy = start_date.getFullYear();
	if(dd<10) {
		dd='0'+dd;
	} 
	if(mm<10) {
		mm='0'+mm;
	} 
	return yyyy+'-'+mm+'-'+dd;
}

function get_end_day(){
	var end_date = new Date();
	end_date.setDate(end_date.getDate()+times[0])
	var dd = end_date.getDate();
	var mm = end_date.getMonth()+1; //January is 0!
	var yyyy = end_date.getFullYear();
	if(dd<10) {
		dd='0'+dd;
	} 
	if(mm<10) {
		mm='0'+mm;
	} 
	return yyyy+'-'+mm+'-'+dd;
}