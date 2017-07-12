# mobileapp

## prerequisites
-  [react native](http://facebook.github.io/react-native/releases/0.25/docs/getting-started.html)
- [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-tab)

#### install dependencies
```
yarn
```

#### run tests
```
yarn test
```

## start app on android or ios
remember to close packager before starting on other platform!
### start on android 

#### list all available android emulators
```
yarn emu:list
```

#### start an installed android emulator, here 'Nexus_6_API_23'
```
emulator @Nexus_6_API_23 &
```

#### start android mobile app on emulator
```
yarn start:android
```

### start ios mobile app (XCode7+)
#### start ios simulator
```
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app
```
#### start ios mobile app on simulator 
```
yarn start:ios
```

## tips
### watchman error 'Error: Error watching file for changes: EMFILE'
- try 
```
rm -rf /usr/local/var/run/watchman
```
- make sure watchman is installed with brew only, not with brew _and_ yarn or npm
```
yarn global list
yarn global remove watchman
rm -rf /usr/local/var/run/watchman
brew uninstall watchman
brew install watchman
 
```