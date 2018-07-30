var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function() {
  // send msg to server
  Client.socket.emit("newPlayer");
};

Client.moveRequest = function(moveData) {
  Client.socket.emit("moveRequest", moveData);
};

Client.socket.on("move", function(data) {
  game.movePlayer(data);
});

// this is your id
Client.socket.on("setPlayer", function(data) {
  game.setPlayer(data.id);
});

// new player join the server
Client.socket.on("newPlayer", function(data) {
  console.log("recieve info - new player ", data);
  game.addNewPlayer(data.id, data.x, data.y);
});

// this is all player in the server
Client.socket.on("allPlayer", function(data) {
  console.log("recieve info - all player ", data);
  for (let i = 0; i < data.length; i++) {
    game.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }
});

Client.socket.on("remove", function(id){
  game.removePlayer(id);
})