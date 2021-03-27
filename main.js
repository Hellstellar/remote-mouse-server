const { app, BrowserWindow } = require('electron')
const createWebSocketServer = require("./src/services/web-socket");
const path = require('path')
require('dotenv').config();

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    })

    win.loadURL('http://localhost:3000')

    //Create Websocket Server
    const port = process.env.WEBSOCKET_PORT;
    createWebSocketServer(port, win.webContents)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})