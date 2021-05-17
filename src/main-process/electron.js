const { app, BrowserWindow } = require('electron')
const WebSocketServer = require("./services/web-socket");
const setQrCodeListener = require("./services/qrcode-handler")
const TrayWindow = require("./services/tray-window");

if (require("electron-squirrel-startup")) {
    app.quit();
}

app.dock.hide()

//TODO: Can be functionality of web workers
const setup = () => {
    const trayWindow = new TrayWindow().trayWindow
    setQrCodeListener(trayWindow.webContents)
    new WebSocketServer(trayWindow.webContents).webSocketServer

    app.on('browser-window-blur', () => {
        trayWindow.hide()
    });
}

app.whenReady().then(async () => {
    setup()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            setup()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

