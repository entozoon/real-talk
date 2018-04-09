var PeerServer = require("peer").PeerServer;
var server = PeerServer({
  port: 1235,
  path: "/real-talk"
});
console.log("Listing on :1235");

server.on("connection", function(id) {
  console.log("connection", id);
});
