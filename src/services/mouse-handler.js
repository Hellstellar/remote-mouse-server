const { moveMouse, getMousePos} = require("robotjs");

const EMouseEvents = {
    MOVE : "MOVE"
}

const moveCursor = (deltaX, deltaY) => {
    const mousePos = getMousePos()
    const finalPositionX = mousePos.x + Number(deltaX);
    const finalPositionY = mousePos.y + Number(deltaY);
    moveMouse(finalPositionX, finalPositionY);
}

const mouseEventPicker = (message) => {
    const [event, deltaX, deltaY] = message.split(' ')
    switch (event) {
        case EMouseEvents.MOVE: moveCursor(deltaX, deltaY)
                                break;
        default: console.error("Invalid event")
    }

}

module.exports = mouseEventPicker