const http = require("http");
const WebSocket = require("ws");


const createWebSocketServer = (port) => {
  const server = http.createServer();
  const webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on("connection", (WebSocket) => {
    //connection is up, let's add a simple simple event
    WebSocket.on("message", (message) => {
      //log the received message and send it back to the client
      console.log("received: %s", message);
      WebSocket.send(`Hello, you sent -> ${message}`);
    });
    console.log("Client Connected")

    //send immediatly a feedback to the incoming connection
    WebSocket.send("Hi there, I am a WebSocket server");
  });

  //start our server
  server.listen(port, () => {
    console.log(`Data stream server started on port ${port}`);
  });
}

module.exports = createWebSocketServer;