const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
import { enableLiveReload } from "electron-compile";
// import SimpleWebRTC from "simplewebrtc";
// var Peer = require("simple-peer");

const path = require("path");
const url = require("url");

// Auto reload stuff
enableLiveReload();
// require("electron-reload")(__dirname, {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron.cmd"),
//   hardResetMethod: "exit"
// });

// var server = require("http").createServer();
// var io = require("socket.io")(server);
// io.on("connection", function(client) {
//   client.on("event", function(data) {});
//   client.on("disconnect", function() {});
// });
// server.listen(3000);

// var pc = new webkitRTCPeerConnection({
//   optional: [{ RtpDataChannels: true }]
// });

// pc.ondatachannel = function(event) {
//   receiveChannel = event.channel;
//   receiveChannel.onmessage = function(event) {
//     document.querySelector("#receive").innerHTML = event.data;
//   };
// };

// sendChannel = pc.createDataChannel("sendDataChannel", { reliable: false });

// document.querySelector("button#send").onclick = function() {
//   var data = document.querySelector("textarea#send").value;
//   sendChannel.send(data);
// };

// var webrtc = new SimpleWebRTC({
//   // the id/element dom element that will hold "our" video
//   localVideoEl: "localVideo",
//   // the id/element dom element that will hold remote videos
//   remoteVideosEl: "remoteVideos",
//   // immediately ask for camera access
//   autoRequestMedia: true
// });

// // var p = new Peer({ initiator: location.hash === "#1", trickle: false });
// var p = new Peer({ trickle: false });

// p.on("error", function(err) {
//   console.log("error", err);
// });

// p.on("signal", function(data) {
//   console.log("SIGNAL", JSON.stringify(data));
//   document.querySelector("#outgoing").textContent = JSON.stringify(data);
// });

// document.querySelector("form").addEventListener("submit", function(ev) {
//   ev.preventDefault();
//   p.signal(JSON.parse(document.querySelector("#incoming").value));
// });

// p.on("connect", function() {
//   console.log("CONNECT");
//   p.send("whatever" + Math.random());
// });

// p.on("data", function(data) {
//   console.log("data: " + data);
// });

function createWindow() {
  let mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// app.on("window-all-closed", function() {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", function() {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
