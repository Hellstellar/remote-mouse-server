import mouseEventHandler from './mouse-handler';
import {getMousePos, getScreenSize, mouseClick, moveMouse} from "robotjs";

jest.mock('robotjs', () => {
     return { moveMouse: jest.fn(), getMousePos: jest.fn(), getScreenSize: jest.fn(), mouseClick: jest.fn() }
})
describe('Mouse Handler', () => {
    it('should move current mouse position by given x and y coordinated when event is move', () => {
        getMousePos.mockReturnValue({x: 0, y: 0})
        getScreenSize.mockReturnValue({width: 10, height: 10})
        const event = 'MOVE';
        const coordinates = '5 5';
        const message = `${event} ${coordinates}`
        mouseEventHandler(message)
        expect(moveMouse).toHaveBeenCalledWith(5, 5)
    });

    it('should left click when event is LEFT_CLICK', () => {
        const event = 'LEFT_CLICK';
        const message = `${event}`
        mouseEventHandler(message)
        expect(mouseClick).toHaveBeenCalledWith('left')
    });
    it('should right click when event is RIGHT_CLICK', () => {
        const event = 'RIGHT_CLICK';
        const message = `${event}`
        mouseEventHandler(message)
        expect(mouseClick).toHaveBeenCalledWith('right')
    });
});