const { ipcMain } = require('electron')
const os = require("os");

const setQrCodeListener = (webContents) => {
    ipcMain.on('qr-code', (event, message) => {
        if (message === 'mounted') {
            const getLocalIPv4Address = os.networkInterfaces().en0.find(elm => elm.family === 'IPv4').address;
            webContents.send('local-ip-address', getLocalIPv4Address)
        }
    })
}

module.exports = setQrCodeListener;