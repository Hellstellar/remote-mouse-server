const EMouseEvents = {
    MOVE : "MOVE",
    LEFT_CLICK : "LEFT_CLICK",
    RIGHT_CLICK: "RIGHT_CLICK",
}

const EErrors = {
    WIRELESS_NETWORK_ERROR: "WIRELESS_NETWORK_ERROR"
}

const EErrorsMessage = {
    WIRELESS_NETWORK_ERROR: "Cannot find a wireless network."
}

const EConnectionStatus = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    FAILED: 'failed'
}

const EMobileStatusMessage = {
    CONNECTED: 'Connected to mobile.',
    DISCONNECTED: 'Waiting to connect...',
    FAILED: 'Failed to connect to mobile.'
}

module.exports = { EMouseEvents, EConnectionStatus, EMobileStatusMessage, EErrors, EErrorsMessage }