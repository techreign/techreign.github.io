function randomNumber() {
	var num = Math.floor(Math.random() * 9);
	return num;
}

function randomColor() {
	document.body.style.backgroundColor = "#" + randomNumber() + randomNumber() + randomNumber() + randomNumber() +
	randomNumber() + randomNumber();	
}



