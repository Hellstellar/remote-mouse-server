const EMouseEvents = {
    MOVE : "MOVE",
    LEFT_CLICK : "LEFT_CLICK",
    RIGHT_CLICK: "RIGHT_CLICK",
}

const EConnectionStatus = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    FAILED: 'failed'
}

const EMobileStatusMessage = {
    CONNECTED: 'Connected to mobile',
    DISCONNECTED: 'Waiting for mobile...',
    FAILED: 'Failed to connect to mobile'
}

module.exports = { EMouseEvents, EConnectionStatus, EMobileStatusMessage }