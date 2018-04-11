import React from "react";
import ReactDOM from "react-dom";
// var Peer = require("simple-peer");
var Peer = require("peerjs");
// const peerJs = require("peerjs-nodejs");
// import SimpleWebRTC from "simplewebrtc";

// var pc = new RTCPeerConnection({
//   optional: [{ RtpDataChannels: true }]
// });

// pc.ondatachannel = function(event) {
//   receiveChannel = event.channel;
//   receiveChannel.onmessage = function(event) {
//     console.log("yassss hello!", event);

//     document.querySelector("#receive").innerHTML = event.data;
//   };
// };

// var configuration = {};
// var pc = new RTCPeerConnection(configuration);
// var channel = pc.createDataChannel("chat", { negotiated: true, id: 0 });
// channel.onopen = function(event) {
//   channel.send("Hi!");
// };
// channel.onmessage = function(event) {
//   console.log(event.data);
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = createUUID();
    console.log("uuid", this.uuid);
    this.state = { debug: null };
    // This is dumb, but yeah
    this.clientId = JSON.parse(process.env.npm_config_argv).remain[0];
    console.log("clientId", this.clientId);
  }
  componentDidMount() {
    var peer = new Peer(this.clientId, {
      host: "localhost",
      port: 9000,
      path: "/peerjs"
    });
    // console.log(peer);

    peer.on("connection", function(conn) {
      console.log("CONNECTION", conn);

      // Client connected to me, let's connect back
      var conn2 = peer.connect("client");
      conn2.on("open", function() {
        console.log("OPEN");
        conn2.send("Hey from server?");
      });

      // Received message
      conn.on("data", function(data) {
        console.log("data", data);
      });
    });

    if (this.clientId == "server") {
      return;
    }

    //
    // CLIENT
    //
    console.log("connecting to server..");

    var conn = peer.connect("server");

    conn.on("open", function() {
      console.log("OPEN");
      conn.send("Hey from client?");
    });

    // document.getElementById('input').addEventListener('keyup', function(e) {
    //   if (e.keyCode == 13) {
    //       conn.send(this.value);
    //       var pre = document.getElementById('chat');
    //       var textContent = document.createTextNode("You said: " + this.value + '\n');
    //       pre.appendChild(textContent);
    //       this.value = '';
    //   }
    // });

    //

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

    //
    // this.peer = new Peer("someid", {
    //   host: "localhost",
    //   // host: "127.0.0.1",
    //   // host: "0.0.0.0",
    //   port: 8443,
    //   path: "/peerjs"
    // });
    // // this.setState({
    // //   debug: "Waiting"
    // // });
    // this.peer.on("open", function(id) {
    //   console.log("OPEN!!", id);
    //   this.setState({
    //     debug: this.state.debug + "My peer ID is: " + id + "\n"
    //   });
    // });
    //
    // this.serverConnection = new WebSocket("wss://localhost:8443");
    // this.serverConnection = new WebSocket("ws://localhost:8443"); // not SSL
    // this.serverConnection.onopen = message => {
    //   console.log("Connected to signalling server");
    // };
    // this.serverConnection.onmessage = message => {
    //   console.log("message", message);
    //   var signal = JSON.parse(message.data);
    //   // Ignore messages from ourself
    //   if (signal.uuid == uuid) return;
    //   if (signal.sdp) {
    //     peerConnection
    //       .setRemoteDescription(new RTCSessionDescription(signal.sdp))
    //       .then(function() {
    //         // Only create answers in response to offers
    //         if (signal.sdp.type == "offer") {
    //           peerConnection
    //             .createAnswer()
    //             .then(createdDescription)
    //             .catch(console.error);
    //         }
    //       })
    //       .catch(console.error);
    //   } else if (signal.ice) {
    //     peerConnection
    //       .addIceCandidate(new RTCIceCandidate(signal.ice))
    //       .catch(console.error);
    //   }
    // };
    // this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
    // this.peerConnection.onicecandidate = gotIceCandidate;
    // this.peerConnection.ontrack = gotRemoteStream;
    // console.log(this.peerConnection);
    // this.peerConnection.ondatachannel = function(event) {
    //   console.log("ondatachannel");
    //   receiveChannel = event.channel;
    //   receiveChannel.onmessage = function(event) {
    //     document.querySelector("div#receive").innerHTML = event.data;
    //   };
    // };
    // this.peer = new Peer({ key: "4er4hhyoxosz6w29" }); // ****
    // this.peer = new Peer("someid", {
    //   // host: "localhost",
    //   port: 8443,
    //   path: "/peerjs"
    // });
    // console.log(this.peer);
    //
    // this.peer.on("connection", function(id) {
    //   console.log(id);
    // });
    // this.peer.on("connection", function(conn) {
    //   console.log("connection");
    //   this.setState({
    //     debug: this.state.debug + "connection\n"
    //   });
    //   conn.on("data", function(data) {
    //     // Will print 'hi!'
    //     console.log(data);
    //     receive.innerHTML = receive.innerHTML + data;
    //   });
    // });
    // var conn = this.peer.connect("4er4hhyoxosz6w29"); // ****
  }
  render() {
    return <div>{this.state.debug}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

function gotRemoteStream(event) {
  console.log("got remote stream");
  remoteVideo.srcObject = event.streams[0];
}

function gotIceCandidate(event) {
  if (event.candidate != null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  }
}

function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
