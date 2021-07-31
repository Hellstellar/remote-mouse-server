const { app, BrowserWindow } = require('electron')
const WebSocketServer = require("./services/web-socket");
const setQrCodeListener = require("./services/qrcode-handler")
const TrayWindow = require("./services/tray-window");
const findPort = require('find-free-port');

if (require("electron-squirrel-startup")) {
    app.quit();
}

app.dock.hide()

//TODO: Can be functionality of web workers
const setup = async () => {
    const trayWindow = new TrayWindow().trayWindow
    const [port] = await findPort(4000)
    setQrCodeListener(trayWindow.webContents, port)
    new WebSocketServer(trayWindow.webContents, port).webSocketServer

    app.on('browser-window-blur', () => {
        trayWindow.hide()
    });
}

app.whenReady().then(async () => {
    await setup()
    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await setup()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

