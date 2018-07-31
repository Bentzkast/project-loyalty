import io from 'socket.io-client'
import Operations from './operations'
import Game_Singleton from './game'
var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function() {
  // send msg to server
  Client.socket.emit(Operations.REQ_NEW_PLAYER);
};

Client.moveRequest = function(moveData) {
  Client.socket.emit(Operations.REQ_MOVE, moveData);
};

Client.socket.on("move", function(data) {
  Game_Singleton.movePlayer(data);
});

// this is your id
Client.socket.on("setPlayer", function(data) {
  Game_Singleton.setPlayer(data.id);
});

// new player join the server
Client.socket.on("newPlayer", function(data) {
  console.log("recieve info - new player ", data);
  Game_Singleton.addNewPlayer(data.id, data.x, data.y);
});

// this is all player in the server
Client.socket.on("allPlayer", function(data) {
  console.log("recieve info - all player ", data);
  for (let i = 0; i < data.length; i++) {
    Game_Singleton.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }
});

Client.socket.on("remove", function(id){
  Game_Singleton.removePlayer(id);
})

export default Client;