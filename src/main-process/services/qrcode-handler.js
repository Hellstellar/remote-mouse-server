const { ipcMain } = require('electron')
const os = require("os");
const {EErrors} = require("../../constants/enums");

const setQrCodeListener = (webContents, port) => {
    ipcMain.on('qr-code', (event, message) => {
        if (message === 'mounted' || message === 'retry') {
            if(!os.networkInterfaces().en0)
                return webContents.send('local-ip-address', EErrors.WIRELESS_NETWORK_ERROR)
            const localIPv4Address = os.networkInterfaces().en0.find(elm => elm.family === 'IPv4').address;
            webContents.send('local-ip-address', `${localIPv4Address}:${port}`)
        }
    })
}

module.exports = setQrCodeListener;