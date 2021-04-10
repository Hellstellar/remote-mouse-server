const { app, BrowserWindow, Tray } = require('electron')
const createWebSocketServer = require("./src/services/web-socket");
const path = require('path')
require('dotenv').config();

let tray, window

app.dock.hide()

function createWindow () {
    window = new BrowserWindow({
        width: 420,
        height: 560,
        show: false,
        frame: false,
        fullscreenable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    })

    window.on('closed', () => window = null)

    window.loadURL('http://localhost:3000')

    //Create Websocket Server
    const port = process.env.WEBSOCKET_PORT;
    createWebSocketServer(port,  window.webContents)
}

const createTray = () => {
    tray = new Tray(path.join(__dirname, 'assets/mouse-outline.png'))
    tray.on('click', () => toggleWindow())
}

const toggleWindow = () => {
    window.isVisible() ? window.hide() : showWindow()
}

const showWindow = () => {
    const position = windowPosition();
    window.setPosition(position.x, position.y)
    window.show()
}

const windowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    const y = Math.round(trayBounds.y + trayBounds.height)
    return { x, y }
}




app.whenReady().then(() => {
    createWindow()
    createTray()
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