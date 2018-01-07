function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var d = today.getDate();
	var mo = today.getMonth();
	var y = today.getYear();
	var suffix = "";
	// adding a zero in front of numbers less than 10
	m = checkTime(m);
	s = checkTime(s);
	y = y + 1900;
	mo = mo + 1;
	if (h < 12) {
		suffix += "AM";
	} else {
		suffix += "PM";
	}
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s + suffix;
	document.getElementById('datee').innerHTML = mo + "/" + d + "/" + y;
	
	t = setTimeout(function() {startTime()}, 500);
}

startTime();