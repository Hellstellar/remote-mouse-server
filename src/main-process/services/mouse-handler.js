const {dragMouse} = require("robotjs");
const {EMouseEvents} = require("../../constants/enums");
const {moveMouse, getMousePos, mouseClick, getScreenSize} = require("robotjs");

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const moveCursor = (deltaX, deltaY, drag= false) => {
    const mousePos = getMousePos()
    const screenSize = getScreenSize()
    const finalPositionX = clamp(mousePos.x + Number(deltaX), 0, screenSize.width);
    const finalPositionY = clamp(mousePos.y + Number(deltaY), 0, screenSize.height);
    if(drag)
        //TODO: not working
        return dragMouse(finalPositionX, finalPositionY)
    moveMouse(finalPositionX, finalPositionY);
}

const mouseEventPicker = (message) => {
    const [event, deltaX, deltaY] = message.split(' ')
    console.log(message)
    switch (event) {
        case EMouseEvents.MOVE:
            moveCursor(deltaX, deltaY)
            break;
        case EMouseEvents.DRAG:
            moveCursor(deltaX, deltaY, true)
            break;
        case EMouseEvents.LEFT_CLICK:
            mouseClick("left")
            break;
        case EMouseEvents.RIGHT_CLICK:
            mouseClick("right")
            break;
        case EMouseEvents.DOUBLE_CLICK:
            mouseClick("left", true)
            break;
        default:
            console.error("Invalid event")
    }

}

module.exports = mouseEventPicker