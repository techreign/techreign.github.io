// shows the answer
function showAnswer() {
	document.getElementById('answer').innerHTML = squareDigit();
}

// performs the squaring of each digit
function squareDigit() {
	var num = document.getElementById('numero').value;
	var newNum = "";
	while (num != 0) {
		var remainder = num % 10;
		var leftNum = Math.floor(num / 10); 
		newNum = remainder * remainder + newNum;
	}
	return newNum;
}