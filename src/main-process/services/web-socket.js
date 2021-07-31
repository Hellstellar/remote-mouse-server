const {URL} = require('url');
const {parse: parseQuery} = require('querystring');
const WebSocket = require('ws');
const mouseEventHandler = require('./mouse-handler')
const {EConnectionStatus} = require("../../constants/enums");

class WebSocketServer {
    #mobileClientName = "MobileClient";
    #clients = {};
    #serverOrigin;
    #webSocketServer;
    #webContents;
    #port;


    constructor(webContents, port) {
        this.#config(port)
        this.#createServer()
        this.#webContents = webContents
        this.#setEvents()
    }

    get webSocketServer() {
        return this.#webSocketServer;
    }

    #config(port) {
        this.#port = port;
        this.#serverOrigin = `http://localhost:${this.#port}`;
    }

    #createServer() {
        this.#webSocketServer = new WebSocket.Server({port: this.#port});
        console.log('Server started at', this.#port)
    }

    #setEvents() {
        this.#webSocketServer.on("connection", (WebSocket, req) => {
            const url = new URL(req.url, this.#serverOrigin)
            const queryParams = parseQuery(url.search.substr(1));

            if (queryParams.clientName === this.#mobileClientName) {
                this.#webContents.send('mobile-status', EConnectionStatus.CONNECTED)
                console.log('mobile client connected')
                this.#clients.mobileClient = WebSocket
            }

            this.#addDisconnectMobileListener()

            WebSocket.on("message", (message) => {
                mouseEventHandler(message)
            });

        });
    }

    #addDisconnectMobileListener() {
        this.#clients.mobileClient?.on('close', () => {
            console.log('mobile disconnected')
            this.#webContents.send('mobile-status', EConnectionStatus.DISCONNECTED)
        })
    };
}


module.exports = WebSocketServer;