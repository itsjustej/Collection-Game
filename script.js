let timer;
let timeLeft = 20;
let x = 50;
let circles = [];
let score = 0;

function setup() {
  createCanvas(400, 400);
  timer = setInterval(countdown, 1000);
}

function draw() {
  background(182, 182, 202);

  textSize(20);
  stroke(0);
  text("Score: " + score, 20, 40);
  text("Time: " + timeLeft, 300, 40);

  rect(x, 250, 50, 50);

  if (keyIsDown(RIGHT_ARROW) && x < width - 50) {
    x += 5;
  }

  if (keyIsDown(LEFT_ARROW) && x > 0) {
    x -= 5;
  }

  // Create a new circle and add it to the circles array every 60 frames
  if (frameCount % 60 === 0) {
    circles.push(new Circle());
  }

  // Update and display each circle
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.update();

    // Check for collision with the square
    if (circle.collides()) {
      score++;
      circles.splice(i, 1); // Remove the collided circle
    }

    circle.display();
  }

  if (score === 10) {
    // Display "You Win" message
    background(182, 182, 202);
    textSize(40);
    textAlign(CENTER);
    fill(0);
    text("You Win!", width / 2, height / 2);
    gameOver = true;
    noLoop(); // Stop calling draw() function
  }
}
  // Game logic only runs if gameOver is false
  if (!gameOver) {
}

function Circle() {
  this.x = random(width);
  this.y = 0;
  this.radius = 10;
  this.speed = (4);

  this.update = function () {
    this.y += this.speed;

    // Remove the circle if it goes off the bottom of the screen
    if (this.y > height) {
      circles.splice(circles.indexOf(this), 1);
    }
  };

  this.display = function () {
    fill(255);
    stroke(0);
    ellipse(this.x, this.y, this.radius * 2);
  };

  this.collides = function () {
    let squareX = x + 25; // Center of the square
    let squareY = 250 + 25; // Center of the square

    let d = dist(squareX, squareY, this.x, this.y);

    return d <= this.radius + 25; // Check for collision between circle and square
  };
}

function countdown() {
  timeLeft--;

  if (timeLeft === 0) {
    clearInterval(timer);
  }
}

function keyPressed() {
  if (!gameOver) {
    // Process arrow key events only if gameOver is false

    if (keyCode === RIGHT_ARROW && x < width - 50) {
      x += 5;
    }

    if (keyCode === LEFT_ARROW && x > 0) {
      x -= 5;
    }
  }
}