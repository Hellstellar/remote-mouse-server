# Remote Mouse Server

## Requirements
- Yarn
- Hammerspoon
- [Remote Mouse spoon](https://github.com/Hellstellar/remote-mouse-spoon/archive/refs/heads/main.zip)

## Get started
- Set environment variables
    - Set a free port number for the websocket server in the `.env` file. Default is `4444`

      `WEBSOCKET_PORT=#port-number`

- Run `yarn install`
- Run `yarn remote-mouse`
- The application will be up and running.

### Connect hammerspoon
- Download and easily setup [Remote Mouse spoon](https://github.com/Hellstellar/remote-mouse-spoon/archive/refs/heads/main.zip) for hammerspoon with
  [Remote Mouse spoon README](https://github.com/Hellstellar/remote-mouse-spoon)
- Make sure the port of web socket server in `.env` and `RemoteMouse.port` match.
- Reload hammerspoon config and you are done with connecting hammerspoon