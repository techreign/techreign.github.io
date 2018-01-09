var num;
var reversedInt;

function showAnswer() {
	// displaying the answer
	if (checkPalindrome()) {
		document.getElementById('answer').innerHTML = "Yes, " + num + " is a palindromic number!";
	} else {
		document.getElementById('answer').innerHTML = "No, " + num + " is not a palindromic number.";
	}
	document.getElementById('numero').value = "";
}

function checkPalindrome() {
	// get the input
	var numString = document.getElementById('numero').value;
	num = parseInt(numString);
	var holder = num;
	var remainder;
	reversedInt = 0;

	while (holder > 0) {
		remainder = holder % 10;	// calculating the remainder
		holder = Math.floor(holder / 10);	// integer division
		reversedInt = (10 * reversedInt) + remainder;
	}
	return (num == reversedInt);
}


