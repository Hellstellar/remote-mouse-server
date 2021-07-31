const { ipcMain } = require('electron')
const os = require("os");

const setQrCodeListener = (webContents, port) => {
    ipcMain.on('qr-code', (event, message) => {
        if (message === 'mounted') {
            const localIPv4Address = os.networkInterfaces().en0.find(elm => elm.family === 'IPv4').address;
            webContents.send('local-ip-address', `${localIPv4Address}:${port}`)
        }
    })
}

module.exports = setQrCodeListener;