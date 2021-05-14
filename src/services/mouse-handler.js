const {EMouseEvents} = require("../constants/enums");
const {moveMouse, getMousePos, mouseClick, getScreenSize} = require("robotjs");

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const moveCursor = (deltaX, deltaY) => {
    const mousePos = getMousePos()
    const screenSize = getScreenSize()
    const finalPositionX = clamp(mousePos.x + Number(deltaX), 0, screenSize.width);
    const finalPositionY = clamp(mousePos.y + Number(deltaY), 0, screenSize.height);
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
        default:
            console.error("Invalid event")
    }

}

module.exports = mouseEventPicker