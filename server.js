// express
var express = require("express");
var app = express();
var server = require("http").Server(app);
// socket.io
var io = require("socket.io").listen(server);
// other
const port = process.env.PORT || 5000;
const Operations = require("./js/operations");

// determine which folder to use
app.use("/styles", express.static(__dirname + "/styles"));
app.use("/scripts", express.static(__dirname + "/scripts"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.lastPlayerID = 0;

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on(Operations.REQ_NEW_PLAYER, function() {
    // create new player object

    socket.player = {
      id: server.lastPlayerID++,
      x: randomInt(100, 400),
      y: randomInt(100, 300)
    };
    console.log("created a new user", socket.player);
    // update the connected, current all players position
    socket.emit("allPlayer", getAllPlayers());

    // update the other clients the info of new player
    socket.broadcast.emit("newPlayer", socket.player);
    // tell which on is you
    socket.emit("setPlayer", socket.player);

    // setup controls
    socket.on(Operations.REQ_MOVE, function(moveData) {
      console.log("move request - ", moveData);
      socket.player.x = moveData.x;
      socket.player.y = moveData.y;
      // tell all client to move this player
      console.log("send move order to", socket.player);

      // update player pos
      socket.broadcast.emit("move", socket.player);
    });

    // remove req to client when disconnected
    socket.on("disconnect", function() {
      console.log(`client ${socket.player.id} disconnected`);
      io.emit("remove", socket.player.id);
    });
  });
});

function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function(socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

server.listen(port, function() {
  console.log(`Listening on ${server.address().port}`);
});
