# Remote Mouse Server
Desktop app for [Remote mouse](https://github.com/Hellstellar/remote-mouse) used to control your Desktop/Laptop mouse from mobile.


## Try the app
### Steps to run the app

#### Download Desktop app
- Download the latest release of [remote-mouse-server](https://github.com/Hellstellar/remote-mouse-server/releases/download/v0.5.0-alpha/Remote.Mouse-darwin-x64-0.5.0.zip).
#### Download Mobile app
- Download the [Expo go Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN&gl=US) /
  [Expo go IOS](https://apps.apple.com/us/app/expo-go/id982107779) on your mobile.
#### Run Desktop app
- Unzip the downloaded file and move it to applications.
- Run this file by double-clicking on it.
- Provide necessary permissions to run the app.
- You will see the remote mouse icon on the menu bar.
- Click on it to see the QR-code.
#### Run Mobile app
- Go to https://expo.dev/@hellstellar/remote-mouse and scan the QR code using the Expo Go app.
- Remote mouse mobile will run on your mobile.
#### Start controlling your mouse
- Scan the QR code on the desktop app with the remote mouse mobile app.
- You will be connected, and you can start controlling your mouse from the trackpad visible on your phone.

## Get started (For devs)
### Requirements
- Yarn
- [Remote mouse](https://github.com/Hellstellar/remote-mouse)
### Development environment
- Run `yarn install` to install dependencies.
- The react ui runs on port `3000` which should be free before running the application.
- Run `yarn remote-mouse:dev` to run the application in development environment.
- The application will be up and running.

### Production environment
- Run `yarn install`
- Run `yarn make` to package the app and create an executable for the host OS.

