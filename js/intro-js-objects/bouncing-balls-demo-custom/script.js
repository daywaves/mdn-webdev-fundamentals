// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var p = document.querySelector('p');

var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// define Shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// define Ball constructor

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

// set up inheritance from Shape

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.consructor = Ball;

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color =
          'rgb(' +
          random(0, 255) +
          ',' +
          random(0, 255) +
          ',' +
          random(0, 255) +
          ')';
      }
    }
  }
};

// define EvilCircle constructor

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;
  this.pressedKeys = {};
}

// set up inheritance from Shape

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

// define EvilCircle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

// define EvilCircle update method

EvilCircle.prototype.update = function() {
  // handle input
  if (this.pressedKeys['ArrowUp']) this.y -= this.velY;
  if (this.pressedKeys['ArrowDown']) this.y += this.velY;
  if (this.pressedKeys['ArrowLeft']) this.x -= this.velX;
  if (this.pressedKeys['ArrowRight']) this.x += this.velX;

  // bounds check
  if (this.x + this.size >= width) {
    this.x = width - this.size;
  }
  if (this.x - this.size <= 0) {
    this.x = this.size;
  }
  if (this.y + this.size >= height) {
    this.y = height - this.size;
  }
  if (this.y - this.size <= 0) {
    this.y = this.size;
  }
};

// define EvilCircle setControls method

EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    this.pressedKeys[e.key] = true;
  };

  window.onkeyup = e => {
    this.pressedKeys[e.key] = false;
  };
};

// define EvilCircle collisionDetect method

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
};

// define array to store balls

var balls = [];

// define EvilCircle instance
var evilCircle = new EvilCircle(random(0, width), random(0, height), true);
evilCircle.setControls();

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      true,
      'rgb(' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ')',
      random(10, 20)
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.update();
  evilCircle.collisionDetect();

  p.textContent = 'Ball count: ' + balls.filter(ball => ball.exists).length;

  requestAnimationFrame(loop);
}

loop();
