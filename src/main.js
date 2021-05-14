const { app, BrowserWindow } = require('electron')
const WebSocketServer = require("./services/web-socket");
const os = require("os");
const TrayWindow = require("./services/tray-window");
const { ipcMain } = require('electron')

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/../node_modules/electron`)
});

app.dock.hide()


const setup = () => {
    const trayWindow = new TrayWindow().trayWindow

    new WebSocketServer(trayWindow.webContents).webSocketServer

    app.on('browser-window-blur', () => {
        trayWindow.hide()
    });

    ipcMain.on('qr-code', (event, message) => {
        if (message === 'mounted')
            trayWindow.webContents.send('local-ip-address', getLocalIPv4Address())
    })
}

const getLocalIPv4Address = () => os.networkInterfaces().en0.find(elm => elm.family === 'IPv4').address;

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

