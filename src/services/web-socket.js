const {URL} = require('url');
const {parse: parseQuery} = require('querystring');
const WebSocket = require('ws');
const mouseEventHandler = require('./mouse-handler')
const {EConnectionStatus} = require("../constants/enums");

require('dotenv').config();

class WebSocketServer {
    #mobileClientName = "MobileClient";
    #clients = {};
    #serverOrigin;
    #webSocketServer;
    #webContents;
    #port;


    constructor(webContents) {
        this.#config()
        this.#createServer()
        this.#webContents = webContents
        this.#listen()
    }

    get webSocketServer() {
        return this.#webSocketServer;
    }

    #config() {
        this.#port = process.env.WEBSOCKET_PORT;
        this.#serverOrigin = `http://localhost:${this.#port}`;
    }

    #createServer() {
        this.#webSocketServer = new WebSocket.Server({port: this.#port});
    }

    #listen() {
        this.#webSocketServer.on("connection", (WebSocket, req) => {
            const url = new URL(req.url, this.#serverOrigin)
            const queryParams = parseQuery(url.search.substr(1));

            if (queryParams.clientName === this.#mobileClientName) {
                this.#webContents.send('mobile-status', EConnectionStatus.CONNECTED)
                console.log('mobile client connected')
                this.#clients.mobileClient = WebSocket
            }

            this.#handleMobileDisconnected(this.#clients)

            WebSocket.on("message", (message) => {
                mouseEventHandler(message)
            });

        });
    }

    #handleMobileDisconnected(clients) {
        if (clients.mobileClient) {
            clients.mobileClient.on('close', () => {
                console.log('mobile disconnected')
                this.#webContents.send('mobile-status', EConnectionStatus.DISCONNECTED)
            })
        }
    };
}


module.exports = WebSocketServer;