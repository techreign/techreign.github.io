// shows the answer
function showAnswer() {
	document.getElementById('answer').innerHTML = squareDigit();
}

// performs the squaring of each digit
function squareDigit() {
	var num = document.getElementById('numero').value;
	var newNum = "";
	var numLeft = parseInt(num);
	while (numLeft != 0) {
		var remainder = num % 10;
		numLeft = Math.floor(numLeft / 10); 
		newNum = remainder * remainder + newNum;
	}
	return newNum;
}