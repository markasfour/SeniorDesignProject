//GET EARLIEST AND OLDEST DATE RANGE
//EARLIEST
var a = new Date(Date.now());
var year = a.getFullYear();
var month = a.getMonth() + 1;
var date = a.getDate();
var earliest_date = year + '-' + month + '-' + date;
console.log(earliest_date);

//OLDEST
var b = new Date();
b.setDate(b.getDate() - 7);
var year = b.getFullYear();
var month = b.getMonth() + 1;
var date = b.getDate();
var oldest_date = year + '-' + month + '-' + date;
console.log(oldest_date);
