var num;
var userAnswer;
var correctAnswer;
var correct;
var counterCorrect = 0;
var counterWrong = 0;

window.onload = function() {
	randomNum();
}

function checkAnswer() {
	computeAnswer();
	correctAnswer = fizzbuzz();

	// check if the user entered a number first
	if (typeof(userAnswer) === 'number') {
		if (userAnswer == correctAnswer) {
			score(true);
		} else {
			score(false);
		}
	} else if (userAnswer == correctAnswer) {
		score(true)
	} else {
		score(false);
	}
	showAnswer();
	randomNum();
}

function score(correct) {
	if (correct) {
		counterCorrect++;
	} else {
		counterWrong++;
	}
}

function showAnswer() {
	document.getElementById('answer').innerHTML = "Correct: " + counterCorrect +
	 "   Wrong: " + counterWrong;
}

function computeAnswer() {
	userAnswer = parseInt(document.getElementById('numero').value) ||
	 document.getElementById('numero').value;
}

function randomNum() {
	num = Math.floor((Math.random() * 1001)+1);
	document.getElementById('display_number').innerHTML = num;
}

function fizzbuzz() {
	var result = "";
	if (num % 3 == 0) result += "fizz";
	if (num % 5 == 0) result += "buzz";
	if (!result) {
		return getNum();
	} else {
		return result;
	}
}

function getNum() {
	return num;
}
