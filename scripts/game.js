const KEYMAP = {
  68: "right",
  65: "left",
  87: "up",
  83: "down"
};

class Control {
  constructor() {
    this.pressedKeys = {
      left: false,
      right: false,
      up: false,
      down: false
    };
    window.addEventListener("keydown", this.keyDown.bind(this), false);
    window.addEventListener("keyup", this.keyUp.bind(this), false);
  }
  keyDown(event) {
    var key = KEYMAP[event.keyCode];
    console.log("key pressed ", key);
    this.pressedKeys[key] = true;
  }
  keyUp(event) {
    var key = KEYMAP[event.keyCode];
    this.pressedKeys[key] = false;
  }
}

class Square {
  constructor(id, x, y) {
    console.log(`Square ${id} is created on pos (${x},${y})`);

    // this four attribute is mandatory
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.setPosition = this.setPosition.bind(this);
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime) {
    // deltaTime time between renders
    // update the state of the world for the elapsed time since last render

    // basic collision
    if (this.x + 5 > game.width || this.x - 5 < 0) {
      this.x = -this.x;
    }
    if (this.y + 5 > game.height || this.y - 5 < 0) {
      this.y = -this.y;
    }
  }

  draw() {
    game.ctx.fillStyle = "red";
    game.ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
  }
}

class Game {
  constructor() {
    this.lastRender = 0;
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.gameObjects = new Map();
    this.id = -1;

    // create the square & register functions
    // let square = new Square(this.ctx, this.width / 2, this.height / 2);
    // this.gameObjects.push(square);
    // start game loop
    window.requestAnimationFrame(this.loop.bind(this));
    this.addNewPlayer = this.addNewPlayer.bind(this);
  }

  addNewPlayer(id, x, y) {
    let square = new Square(id, x, y);
    this.gameObjects.set(square.id, square);
  }

  setPlayer(id) {
    this.id = id;
  }

  movePlayer(data) {
    this.gameObjects.get(data.id).setPosition(data.x, data.y);
  }

  removePlayer(id) {
    this.gameObjects.delete(id);
  }

  updateAll(deltaTime) {
    for (let go of this.gameObjects.values()) {
      go.update(deltaTime);
    }
  }

  drawAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let go of this.gameObjects.values()) {
      go.draw();
    }
  }

  controlCheck(deltaTime) {
    if (this.id === -1) return;
    let controlled = this.gameObjects.get(this.id);
    if (!controlled) console.error("controlled is ", controlled);

    let pressedKeys = control.pressedKeys;

    let velocity = { x: 0, y: 0 };
    if (pressedKeys.left) {
      velocity.x -= controlled.speed * deltaTime;
    }
    if (pressedKeys.right) {
      velocity.x += controlled.speed * deltaTime;
    }
    if (pressedKeys.down) {
      velocity.y += controlled.speed * deltaTime;
    }
    if (pressedKeys.up) {
      velocity.y -= controlled.speed * deltaTime;
    }
    if (velocity.x === 0 && velocity.y === 0) return;
    Client.moveRequest({ id: this.id, x: velocity.x, y: velocity.y });
  }

  loop(timestamp) {
    var deltaTime = timestamp - this.lastRender;

    this.updateAll(deltaTime);
    this.drawAll();
    this.controlCheck(deltaTime);
    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop.bind(this));
  }
}

var control = new Control();
var game = new Game();
Client.askNewPlayer();
