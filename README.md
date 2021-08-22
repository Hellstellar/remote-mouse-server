# Remote Mouse Server
Desktop app for [Remote mouse](https://github.com/Hellstellar/remote-mouse) used to control your Desktop/Laptop mouse from mobile.


##Try the app
### Steps to run the app
- Download the [Expo go Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN&gl=US) /
  [Expo go IOS](https://apps.apple.com/us/app/expo-go/id982107779) on your mobile.
- Go to and scan the QR code using the Expo Go app.
- Remote mouse mobile will run on your mobile.
- Download the latest release of remote-mouse-server.
- Unzip the release and move the unzipped file to applications.
- Run this file by double-clicking on it.
- You will see the remote mouse icon on the menu bar.
- Click on it to see the QR-code.
- Scan this QR code with the remote mouse mobile app.
- You will be connected, and you can start controlling your mouse

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

