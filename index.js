import {AppRegistry, LogBox, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import 'react-native-gesture-handler';
PushNotification.configure({
  onRegister: function (token) {
    console.log(token);
  },
  onNotification: notification => {
    console.log('NOTIFICATION:', JSON.stringify(notification));
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
AppRegistry.registerComponent(appName, () => App);
