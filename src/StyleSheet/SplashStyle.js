import {StyleSheet, KeyboardAvoidingView} from 'react-native';

const SplashStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  splashimages: {
    flexDirection: 'column',
    height: '60%',
    width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  welcometext: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    right: 17,
  },
});

export default SplashStyle;
