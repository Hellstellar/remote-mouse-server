const http = require('http');
const { URL } = require('url');
const { parse: parseQuery } = require('querystring');
const WebSocket = require('ws');
const mouseEventHandler = require('./mouse-handler')
const {EConnectionStatus} = require("../constants/enums");


const mobileClientName = "MobileClient"

const handleMobileDisconnected = (clients, webContents) => {
    if (clients.mobileClient) {
        clients.mobileClient.on('close', () => {
            console.log('mobile disconnected')
            webContents.send('mobile-status', EConnectionStatus.DISCONNECTED)
        })
    }
};

const createWebSocketServer = (port, webContents) => {
    const serverOrigin = `http://localhost:${port}`;
    const server = http.createServer();
    const webSocketServer = new WebSocket.Server({ server });
    const clients = {}

    webSocketServer.on("connection", (WebSocket,req) => {
        const url = new URL(req.url, serverOrigin)
        const queryParams = parseQuery(url.search.substr(1));

        if(queryParams.clientName === mobileClientName) {
            webContents.send('mobile-status', EConnectionStatus.CONNECTED)
            console.log('mobile client connected')
            clients.mobileClient = WebSocket
        }

        handleMobileDisconnected(clients, webContents)

        WebSocket.on("message", (message) => {
            mouseEventHandler(message)
        });

    });

    server.listen(port, () => {
        console.log(`Data stream server started on port ${port}`);
    });
}

module.exports = createWebSocketServer;