import React from "react";
import ReactDOM from "react-dom";

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

let receive = document.getElementById("receive");
console.log("Receiver");
receive.innerHTML = receive.innerHTML + "Receiver";
var peer = new Peer({ key: "4er4hhyoxosz6w29" });

peer.on("open", function(id) {
  console.log("My peer ID is: " + id);
  receive.innerHTML = receive.innerHTML + ("My peer ID is: " + id);
});

peer.on("connection", function(conn) {
  console.log("connection");
  receive.innerHTML = receive.innerHTML + "connection";
  conn.on("data", function(data) {
    // Will print 'hi!'
    console.log(data);
    receive.innerHTML = receive.innerHTML + data;
  });
});

class App extends React.Component {
  render() {
    return <div>haaaaaa!</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
