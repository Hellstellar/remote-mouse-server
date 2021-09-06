const {app, BrowserWindow, Tray, Menu, ipcMain} = require('electron')
const path = require('path')
const isDev = require("electron-is-dev");

class TrayWindow {
    #trayWindow;
    #tray;
    #windowWidth = 420;
    #windowHeight = 560;

    constructor() {
        this.#trayWindow = new BrowserWindow({
            width: this.#windowWidth,
            height: this.#windowHeight,
            show: true,
            frame: false,
            fullscreenable: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        })
        this.#createTray()
        this.#setEvents()

        //TODO: Can be made async by following builder pattern (Error: browser window methods are not exposed this way)
        this.#trayWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../../../build/index.html")}`)
    }

    get trayWindow() {
        return this.#trayWindow;
    }

    #setEvents() {
        this.#trayWindow.on('closed', () => this.#trayWindow = null)
        this.#tray.on('click', () => this.#toggleWindow())
        this.#tray.on('right-click', () => this.#tray.popUpContextMenu(this.#createMenu()))
        ipcMain.on('mobile-status', (event, message) => {
            if (message === 'changed')
                this.#showWindow()
        })
    }

    #createTray() {
        this.#tray = new Tray(path.join(__dirname, '../../icons/png/Icon-App-20x20@3x.png'))
    }

    #createMenu() {
        return Menu.buildFromTemplate([
            {
                label: 'Quit',
                type: 'normal',
                click: () => app.quit()
            }
        ]);
    }

    #toggleWindow() {
        this.#trayWindow.isVisible() ? this.#trayWindow.hide() : this.#showWindow()
    }

    #showWindow = () => {
        const position = this.#windowPosition();
        this.#trayWindow.setPosition(position.x, position.y)
        this.#trayWindow.setVisibleOnAllWorkspaces(true)
        this.#trayWindow.show()
        this.#trayWindow.focus();
    }

    #windowPosition() {
        const windowBounds = this.#trayWindow.getBounds();
        const trayBounds = this.#tray.getBounds();
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
        const y = Math.round(trayBounds.y + trayBounds.height)
        return {x, y}
    }
}

module.exports = TrayWindow;