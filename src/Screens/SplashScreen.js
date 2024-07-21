import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    checkUserStatus();
  }, []);
  const checkUserStatus = async () => {
    let data = await AsyncStorage.getItem('loggedInUser');
    if (data) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
