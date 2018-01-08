// global game variables
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballRadius = 10;
var ballSpeedX = 12;
var ballSpeedY = 1;
var paddleWidth = 10;
const PADDLE_HEIGHT = 100;
const WINNING_SCORE = 5;
var paddle1X = 0;
var paddle1Y = 100;
var paddle2X;
var paddle2Y = 100;
var backgroundColour = "black";
var paddleColour = "white";
var ballColour = "red";
var player1Score = 0;
var player2Score = 0;
var showingWinScreen = false;

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
		paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
	});
}

function handleMouseClick(evt) {
	if (showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}

function drawNet() {
		for(var i = 0; i < canvas.height; i+= 40) {
			colourRect(canvas.width/2-1, i, 2, 20, 'white');
		}
}

function drawEverything() {
	// draws a black background for the game
	colourRect(0, 0, canvas.width, canvas.height, backgroundColour);

	if (showingWinScreen) {
		canvasContext.fillStyle = "white";
		if (player1Score >= WINNING_SCORE) {
			canvasContext.fillText("P1 wins! Click to Continue", canvas.width/2, canvas.height/2);
		} else {
			canvasContext.fillText("P2 wins! Click to Continue", canvas.width/2, canvas.height/2);
		}
		return;
	}

	drawNet();
	// draws the padel
	colourRect(paddle1X, paddle1Y, paddleWidth, PADDLE_HEIGHT, paddleColour);
	// draws the computer paddle
	colourRect(canvas.width - (paddleWidth), paddle2Y, paddleWidth, PADDLE_HEIGHT, paddleColour);
	// draws the ball
	colourCircle(ballX, ballY, ballRadius, ballColour);
	// draws the net

	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, 700, 100);

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
	computerMovement();

	// handling the ball horizontal collisions with the wall
	if (ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) { 
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player1Score++;
			ballReset();
		}
	}
	if (ballX < 0) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){ 
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player2Score++;
			ballReset();
		}
	}
	// handling the ball vertical collisions with the wall
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}

}

// player 2 AI movement
function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY + 35) {
		paddle2Y -= 6;
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
	if (player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE ) {
		showingWinScreen = true;
	}
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedX = -ballSpeedX;
}