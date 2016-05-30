
/* 
get_start_day and get_end_day is built on the solution at the following url:
http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript 
*/
function get_start_day(slider_min){
	console.log("slider min is " + slider_min);
	var start_date = new Date();
	
	if(slider_min != 0){
		start_date.setDate(start_date.getDate()+slider_min);
	}
	
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

function get_end_day(slider_max){
	var end_date = new Date();
	if(slider_max != 0){
		end_date.setDate(end_date.getDate()+slider_max);
	}
	
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


