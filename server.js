// const port = 9000;
// var express = require("express");
// var sockets = require("signal-master/sockets");

// var app = express();
// var server = app.listen(port);
// var config = {
//   isDev: true,
//   server: {
//     port: 9000,
//     secure: false,
//     key: null,
//     cert: null,
//     password: null
//   },
//   rooms: {
//     maxClients: 0
//   },
//   stunservers: [
//     {
//       urls: "stun:stun.l.google.com:19302"
//     }
//   ],
//   turnservers: [
//     {
//       urls: ["turn:your.turn.servers.here"],
//       secret: "turnserversharedsecret",
//       expiry: 86400
//     }
//   ]
// };

// sockets(server, config); // config is the same that server.js uses

// /*global console*/
// var yetify = require("yetify"),
//   config = require("getconfig"),
//   fs = require("fs"),
//   sockets = require("./sockets"),
//   port = parseInt(process.env.PORT || config.server.port, 10),
//   server_handler = function(req, res) {
//     res.writeHead(404);
//     res.end();
//   },
//   server = null;

// //
// // https://github.com/andyet/signalmaster
// //

// // Create an http(s) server instance to that socket.io can listen to
// if (config.server.secure) {
//   server = require("https").Server(
//     {
//       key: fs.readFileSync(config.server.key),
//       cert: fs.readFileSync(config.server.cert),
//       passphrase: config.server.password
//     },
//     server_handler
//   );
// } else {
//   server = require("http").Server(server_handler);
// }
// server.listen(port);

// sockets(server, config);

// if (config.uid) process.setuid(config.uid);

// var httpUrl;
// if (config.server.secure) {
//   httpUrl = "https://localhost:" + port;
// } else {
//   httpUrl = "http://localhost:" + port;
// }
// console.log(yetify.logo() + " -- signal master is running at: " + httpUrl);

//

const port = 9000;
var express = require("express");
var app = express();
var ExpressPeerServer = require("peer").ExpressPeerServer;

app.get("/", function(req, res, next) {
  res.send("Hello world!");
});

// var server = app.listen(port);

var options = {
  debug: true
};

// var peerserver = ExpressPeerServer(server, options);

// app.use("/api", peerserver);

// == OR ==

var server = require("http").createServer(app);
var peerserver = ExpressPeerServer(server, options);

app.use("/peerjs", peerserver);

server.listen(port);
// console.log(peerserver);
peerserver.on("connection", function(id) {
  console.log("connection", id);
});

peerserver.on("connect", function(id) {
  console.log("connect", id);
});

peerserver.on("open", function(id) {
  console.log("open", id);
});

// const port = 8443;
// const http = require("http");

// const handleRequest = function(request, response) {
//   // Render the single client html file for any request the HTTP server receives
//   console.log("request received: " + request.url);
// };
// const httpServer = http.createServer(handleRequest);
// httpServer.listen(port);

// var PeerServer = require("peer").PeerServer;

// // var server = PeerServer({
// //   port: port,
// //   path: "/real-talk"
// // });

// var options = {
//   debug: true,
//   allow_discovery: true
// };

// var server = PeerServer(httpServer, options);

// console.log("Listing on:", port);

// server.on("connection", function(id) {
//   console.log("connection", id);
// });

//

// // https://github.com/shanet/WebRTC-Example
// const HTTPS_PORT = 8443;
// const fs = require("fs");
// const https = require("https");
// const http = require("http");
// const WebSocket = require("ws");
// const WebSocketServer = WebSocket.Server;

// // Yes, TLS is required
// const serverConfig = {
//   // key: fs.readFileSync("./key.pem"),
//   // cert: fs.readFileSync("./cert.pem")
// };

// // ----------------------------------------------------------------------------------------

// // Create a server for the client html page
// const handleRequest = function(request, response) {
//   // Render the single client html file for any request the HTTP server receives
//   console.log("request received: " + request.url);

//   // if (request.url === "/") {
//   //   response.writeHead(200, { "Content-Type": "text/html" });
//   //   response.end(fs.readFileSync("client/index.html"));
//   // } else if (request.url === "/webrtc.js") {
//   //   response.writeHead(200, { "Content-Type": "application/javascript" });
//   //   response.end(fs.readFileSync("client/webrtc.js"));
//   // }
//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.end("hey");
// };

// // const httpsServer = https.createServer(serverConfig, handleRequest);
// // httpsServer.listen(HTTPS_PORT, "0.0.0.0");
// const httpServer = http.createServer(handleRequest);
// httpServer.listen(HTTPS_PORT, "0.0.0.0");

// // ----------------------------------------------------------------------------------------

// // Create a server for handling websocket calls
// // const wss = new WebSocketServer({ server: httpsServer });
// const wss = new WebSocketServer({ server: httpServer });

// wss.on("connection", function(ws) {
//   ws.on("message", function(message) {
//     // Broadcast any received message to all clients
//     console.log("received: %s", message);
//     wss.broadcast(message);
//   });
// });

// wss.broadcast = function(data) {
//   this.clients.forEach(function(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// };

// console.log("Server running. Visit https://localhost:" + HTTPS_PORT);
