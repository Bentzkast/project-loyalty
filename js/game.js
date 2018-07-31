import Entity from "./entity";
import Control_Singleton from "./control";
import Client from "./client";
class Game {
  constructor() {
    this.lastRender = 0;
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.gameObjects = new Map();
    this.id = -1;

    this.addNewPlayer = this.addNewPlayer.bind(this);
  }

  startGame() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  version() {
    return "Version 0.0.2 - latency fix";
  }

  addNewPlayer(id, x, y) {
    let entity = new Entity(id, x, y);
    this.gameObjects.set(entity.id, entity);
  }

  setPlayer(id) {
    this.id = id;
  }

  movePlayer(data) {
    this.gameObjects.get(data.id).setTargetPos(data.x, data.y);
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

    let pressedKeys = Control_Singleton.pressedKeys;

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
    controlled.setTargetPos(controlled.x + velocity.x, controlled.y + velocity.y)
    Client.moveRequest({ id: this.id, x: controlled.x, y: controlled.y });
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
const Game_Singleton = new Game();
export default Game_Singleton;
