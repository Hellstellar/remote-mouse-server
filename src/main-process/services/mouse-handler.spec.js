import mouseEventHandler from './mouse-handler';
import { moveMouse } from "robotjs";

jest.mock('robotjs', () => {
     return { moveMouse: jest.fn() }
})
xdescribe('Mouse Handler', () => {
    xit('should move current mouse position by given x and y coordinated when event is move', () => {
        const event = 'MOVE';
        const coordinates = '5 5';
        const message = `${event} ${coordinates}`
        mouseEventHandler(message)
        expect(moveMouse).toHaveBeenCalled()
    });
});