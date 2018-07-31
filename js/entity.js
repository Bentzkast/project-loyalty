import Game_Singleton from "./game";

class Entity {
  constructor(id, x, y) {
    console.log(`Square ${id} is created on pos (${x},${y})`);

    // this four attribute is mandatory
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.targetPosX = this.x;
    this.targetPosY = this.y;
    // bind this
    this.setPosition = this.setPosition.bind(this);
    this.setTargetPos = this.setTargetPos.bind(this);
  }
  setTargetPos(x, y){
    this.targetPosX = x;
    this.targetPosY = y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime) {
    // deltaTime time between renders
    // update the state of the world for the elapsed time since last render
    this.x = this.targetPosX;
    this.y = this.targetPosY;

    // this should tween toward target pos
  }

  draw() {
    Game_Singleton.ctx.fillStyle = "red";
    Game_Singleton.ctx.fillRect(this.x - 5, this.y - 5, 10, 10);
  }
}

export default Entity;