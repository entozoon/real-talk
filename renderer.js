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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { debug: null };
  }
  componentDidMount() {
    this.peer = new Peer({ key: "4er4hhyoxosz6w29" }); // ****
    this.setState({
      debug: "Waiting"
    });
    this.peer.on("open", function(id) {
      this.setState({
        debug: this.state.debug + "My peer ID is: " + id + "\n"
      });
    });
    this.peer.on("connection", function(conn) {
      this.setState({
        debug: this.state.debug + "connection\n"
      });
      conn.on("data", function(data) {
        // Will print 'hi!'
        console.log(data);
        receive.innerHTML = receive.innerHTML + data;
      });
    });
    var conn = this.peer.connect("4er4hhyoxosz6w29"); // ****
  }
  render() {
    return <div>{this.state.debug}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
