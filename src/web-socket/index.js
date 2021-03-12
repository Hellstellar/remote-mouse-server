const http = require("http");
const WebSocket = require("ws");

const createWebSocketServer = (port) => {
  const server = http.createServer();
  const webSocketServer = new WebSocket.Server({ server });
  const clients = {
    hammerSpoonClient: {},
    mobileClient: {}
  }

  webSocketServer.on("connection", (WebSocket,req) => {
    if(req.url.includes("HammerSpoon")) {
      console.log('hammerspoon connected')
      clients.hammerSpoonClient = WebSocket
    }
    else if(req.url.includes("MobileClient")) {
      console.log('mobile client connected')
      clients.mobileClient = WebSocket
    }
    clients.mobileClient.on("message", (message) => {
      console.log("received: %s", message);
      clients.hammerSpoonClient.send(`${message}`);
    });

    WebSocket.send("Hi there, I am remote mouse");
  });

  server.listen(port, () => {
    console.log(`Data stream server started on port ${port}`);
  });
}

module.exports = createWebSocketServer;