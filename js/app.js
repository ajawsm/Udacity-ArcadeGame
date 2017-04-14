var x = this.x;
var y = this.y;
var dx = 101;
var dy = 83;
var height = 415;
var width = 415;
var yArray = [68, 151, 234];
var speedArray = [90, 180, 300, 450];
var lastTime;
var playerWidth = 60;
var playerHeight = 80;
var enemyWidth = 80;
var enemyHeight = 60;

// Enemies our player must avoid

/*The enemies start off the screen and pick a random speed from the speedArray*/
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -101;
    this.y = yArray[Math.floor(Math.random() * yArray.length)];
    this.sprite = 'images/enemy-bug.png';
    this.speed = speedArray[Math.floor(Math.random() * speedArray.length)];

};

/*Enemy x positions update at the randomly selected speed and start over
once they exceed the canvas x bound*/
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*The player appears in the proper square*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

/*The player moves on the proper keystrokes, defined in engine
Thanks Udacity forums for help with different ways of accomplishing this.
We could also do this with a switch, but I chose if/else method*/
Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y - dy < height && this.y - dy > -20) {
        y = this.y -= dy;
    } else if (direction === 'down' && this.y + dy < height && this.y + dy > -20) {
        y = this.y += dy;
    } else if (direction === 'left' && this.x - dx < width && this.x - dx > -20) {
        x = this.x -= dx;
    } else if (direction === 'right' && this.x + dx < width && this.x + dx > -20) {
        x = this.x += dx;
    } else {
        return false;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* Resets the player at his starting position */
Player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
};

/* Give user a victory message and resets game */
Player.prototype.victory = function() {
    if (player.y <= -15) {
        alert('You win! Bug out!')
        player.reset();
    }
};


/* Huge thanks to MDN and Udacity forums. This creates collision boxes
based on the general size of the objects (bugs and player) and identifies
when the objects collide. widths and heights of enemies can be adjusted in
the vars at top of screen. Player resets if condition is true. For statement
checks all enemy locations against player location. */
var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + enemyWidth &&
            player.x + playerWidth > allEnemies[i].x &&
            player.y < allEnemies[i].y + enemyHeight &&
            player.y + playerHeight > allEnemies[i].y
        ) {
            player.reset();
        }

    }
};



/* There are five enemies, we can add more or less to change difficulty. */
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
