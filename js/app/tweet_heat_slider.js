
function get_new_day(slider_val){
	var new_date = new Date();
	
	if(slider_val != 0){
		new_date.setDate(new_date.getDate()-slider_val);
	}
	return new_date;
	
	/*
	var dd = start_date.getDate();
	var mm = start_date.getMonth()+1; //January is 0!
	var yyyy = start_date.getFullYear();
	if(dd<10) {
		dd='0'+dd;
	} 
	if(mm<10) {
		mm='0'+mm;
	} 
	return yyyy+'-'+mm+'-'+dd;*/
}


function to_date(string_date){
	var parsedDate = new Date();
	//console.log("date is " + string_date)
	times = string_date.split("-");
	
	parsedDate.setYear(parseInt(times[0]));
	parsedDate.setMonth(parseInt(times[1]) - 1);//January is 0
	parsedDate.setDate(parseInt(times[2]));
	
	parsedDate.setHours(0);  
	parsedDate.setMilliseconds(0);   
	parsedDate.setMinutes(0);    
	parsedDate.setSeconds(0);

	return parsedDate;
}
