const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

// Auto reload stuff
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron.cmd"),
  hardResetMethod: "exit"
});

// var server = require("http").createServer();
// var io = require("socket.io")(server);
// io.on("connection", function(client) {
//   client.on("event", function(data) {});
//   client.on("disconnect", function() {});
// });
// server.listen(3000);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

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
