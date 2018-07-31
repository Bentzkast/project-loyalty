var Operations = {
  // client to server
  REQ_NEW_PLAYER : "reqnewplayer",
  REQ_MOVE : "reqmovement",
  REQ_PLAYER_UPDATE : "reqplayerupdate",
  REQ_WORLD_INIT : "reqworldinit",
  // server to client
  RES_WORLD_UPDATE : "reqworldupdate",
  RES_WORLD_INIT : "reqworldinit"
}

if (typeof(module) === 'object') {
  module.exports = Operations;
}