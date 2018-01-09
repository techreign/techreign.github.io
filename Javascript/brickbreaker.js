// global game variables
var canvas;
var canvasContext;
var ballX = 100;
var ballY = 100;
var ballRadius = 10;
var ballSpeedX = 3;
var ballSpeedY = 10;
var paddleWidth = 100;
const PADDLE_HEIGHT = 10;
const WINNING_SCORE = 5;
var paddle1X = 400;
var paddle1Y = 590;
var backgroundColour = "black";
var paddleColour = "white";
var ballColour = "red";
var player1Score = 0;
var player2Score = 0;
var showingWinScreen = false;
var brickWidth = 100;
var brickHeight = 10;

// game main run function
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.font="20px Georgia";

	// game runs on 30 fps
	var framesPerSecond = 30;
	setInterval(function() {
			moveEverything();
			drawEverything();
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClick);

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1X = mousePos.x - paddleWidth/2;
	});
}

function handleMouseClick(evt) {
	if (showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}

function drawEverything() {
	// draws a black background for the game
	colourRect(0, 0, canvas.width, canvas.height, backgroundColour);

	if (showingWinScreen) {
		canvasContext.fillStyle = "white";
		if (player1Score >= WINNING_SCORE) {
			canvasContext.fillText("You win! Click to Continue", canvas.width/2, canvas.height/2);
		} 
		return;
	}

	// draws the padel
	colourRect(paddle1X, paddle1Y, paddleWidth, PADDLE_HEIGHT, paddleColour);
	// draws the ball
	colourCircle(ballX, ballY, ballRadius, ballColour);
	// draw the bricks
	drawBricks();
}

function drawBricks() {
	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 6; i++) {
			colourRect(50 + (i * (brickWidth + 5)), 50 + (brickHeight + (j*30)),
			brickWidth, brickHeight, paddleColour );
		}
	}
}



// helper function to draw the objects
function colourRect(leftX, topY, width, height, drawColour) {
	canvasContext.fillStyle = drawColour;
	canvasContext.fillRect(leftX, topY, width, height);
}

// helper function to draw circles
function colourCircle(centerX, centerY, radius, colour) {
	canvasContext.fillStyle = colour;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function moveEverything() {
	if (showingWinScreen) {
		return;
	}
	// controlling the ball movement
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// handling the ball horizontal collisions with the wall
	if (ballX > canvas.width) {
		ballSpeedX = -ballSpeedX;
	}
	if (ballX < 0) {
		ballSpeedX = -ballSpeedX;
	}
	// handling the ball vertical collisions with the wall
	if (ballY > canvas.height) {
		if (ballX <= paddle1X + paddleWidth &&
			ballX >= paddle1X) {
			ballSpeedY = -ballSpeedY;
		} else {
			ballReset();
		}
	}
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}

}

function calculateMousePos(evt) {
	// adjusting the mouse position
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function ballReset() {
	if (player1Score >= WINNING_SCORE ) {
		showingWinScreen = true;
	}
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedX = -ballSpeedX;
}