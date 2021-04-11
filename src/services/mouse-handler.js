const { EMouseEvents } = require("../constants/enums");
const { moveMouse, getMousePos, mouseClick } = require("robotjs");

const moveCursor = (deltaX, deltaY) => {
    const mousePos = getMousePos()
    const finalPositionX = mousePos.x + Number(deltaX);
    const finalPositionY = mousePos.y + Number(deltaY);
    moveMouse(finalPositionX, finalPositionY);
}

const mouseEventPicker = (message) => {
    const [event, deltaX, deltaY] = message.split(' ')
    switch (event) {
        case EMouseEvents.MOVE:
            moveCursor(deltaX, deltaY)
            break;
        case EMouseEvents.LEFT_CLICK:
            mouseClick("left")
            break;
        case EMouseEvents.RIGHT_CLICK:
            mouseClick("right")
            break;
        default: console.error("Invalid event")
    }

}

module.exports = mouseEventPicker