import {View, Image, Text} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashStyle from '../StyleSheet/SplashStyle';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    checkUserStatus();
  }, []);
  const checkUserStatus = async () => {
    let data = await AsyncStorage.getItem('loggedInUser');
    if (data) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };
  return (
    <>
      <View style={SplashStyle.container}>
        <View style={SplashStyle.splashimages}>
          <Image
            source={require('../Asset/expense.png')}
            style={{
              height: '80%',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
        <Text style={SplashStyle.welcometext}>Welcome to Expense Tracker</Text>
      </View>
    </>
  );
};

export default SplashScreen;
