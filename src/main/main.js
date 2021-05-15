const { app, BrowserWindow } = require('electron')
const WebSocketServer = require("./services/web-socket");
const setQrCodeListener = require("./services/qrcode-handler")
const TrayWindow = require("./services/tray-window");


require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/../../node_modules/electron`)
});

app.dock.hide()


const setup = () => {
    const trayWindow = new TrayWindow().trayWindow
    setQrCodeListener(trayWindow.webContents)
    new WebSocketServer(trayWindow.webContents).webSocketServer

    app.on('browser-window-blur', () => {
        trayWindow.hide()
    });


}



app.whenReady().then(() => {
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

