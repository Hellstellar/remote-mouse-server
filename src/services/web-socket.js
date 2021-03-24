const http = require('http');
const { URL } = require('url');
const { parse: parseQuery } = require('querystring');
const WebSocket = require('ws');

const EConnectionStatus = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    FAILED: 'failed'
}

const hammerspoonClientName = "Hammerspoon"
const mobileClientName = "MobileClient"

const handleHammerspoonDisconnected = (clients, webContents) => {
    if (clients.hammerSpoonClient) {
        clients.hammerSpoonClient.on('close', () => {
            console.log('hammerspoon disconnected')
            webContents.send('hammerspoon-status', EConnectionStatus.DISCONNECTED)
        })
    }
};

const createWebSocketServer = (port, webContents) => {
    const serverOrigin = `http://localhost:${port}`;
    const server = http.createServer();
    const webSocketServer = new WebSocket.Server({ server });
    const clients = {
        hammerSpoonClient: {},
        mobileClient: {}
    }

    webSocketServer.on("connection", (WebSocket,req) => {
        const url = new URL(req.url, serverOrigin)
        const queryParams = parseQuery(url.search.substr(1));

        if(queryParams.clientName === hammerspoonClientName) {
            webContents.send('hammerspoon-status', EConnectionStatus.CONNECTED)
            console.log('hammerspoon connected')
            clients.hammerSpoonClient = WebSocket
        }
        else if(queryParams.clientName === mobileClientName) {
            webContents.send('mobile-status', EConnectionStatus.CONNECTED)
            console.log('mobile client connected')
            clients.mobileClient = WebSocket
        }

        handleHammerspoonDisconnected(clients, webContents);

        WebSocket.on("message", (message) => {
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