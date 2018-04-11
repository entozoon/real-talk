//
// Erg, what's up with wrtc in node??
//
// var SimplePeer = require("simple-peer");
// var wrtc = require("wrtc");

// var peer = new SimplePeer({
//   host: "localhost",
//   port: 9000,
//   path: "/peerjs",
//   initiator: true,
//   wrtc: wrtc
// });
// // var peer2 = new SimplePeer({ wrtc: wrtc });

// // var peer = new SimplePeer("someid", {
// //   host: "localhost",
// //   port: 8443,
// //   path: "/real-talk",
// //   initiator: true,
// //   wrtc: true
// // });

// peer.on("open", function(id) {
//   console.log("open", id);
// });
// peer.on("signal", function(id) {
//   console.log("signal", id);
// });

// node --experimental-modules server-receive-test-compiled.mjs
// NOPE THIS DOESN'T WORK IN NODE DIRECTLY
// https://github.com/andyet/SimpleWebRTC/issues/67

// import SimpleWebRTC from "simplewebrtc";

// var webrtc = new SimpleWebRTC({
//   // url: "localhost"
//   url: "localhost:9000"
// });
// // 3. Tell it to join a room when ready
// // we have to wait until it's ready
// webrtc.on("readyToCall", function() {
//   // you can name it anything
//   webrtc.joinRoom("your awesome room name");
// });
// webrtc.on("connectionReady", function(id) {
//   console.log("connectionReady", id);
// });

var SimplePeer = require("simple-peer");
var wrtc = require("electron-webrtc")();

// handle errors that may occur when trying to communicate with Electron
wrtc.on("error", function(err) {
  console.log(err);
});

var config = {
  url: "localhost",
  host: "localhost"
};

// uses the same API as the `wrtc` package
var pc = new wrtc.RTCPeerConnection(config);

// compatible with `simple-peer`
var peer = new SimplePeer({
  initiator: true,
  wrtc: wrtc
});

// listen for errors
wrtc.on("error", function(err, source) {
  console.error(err);
});
