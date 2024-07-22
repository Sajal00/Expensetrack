import React, {useEffect} from 'react';
import AppNavigator from './src/AppNavigator/AppNavigator';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store/Store';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const _getDeviceToken = async () => {
  let token = await messaging().getToken();
  console.log('device token from firebase is ', token);
};

const App = () => {
  //
  useEffect(() => {
    _getDeviceToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived foreground mode!',
        JSON.stringify(remoteMessage),
      );
    });
    return unsubscribe;
  }, []);
  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
