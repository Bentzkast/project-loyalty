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
const Control_Singleton = new Control(); 
export default Control_Singleton;