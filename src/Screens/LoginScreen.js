import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import loginStyle from '../StyleSheet/Loginstyle';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const _handlelogin = () => {
    navigation.navigate('SignUp');
    console.log('clicked');
  };
  const handleSignIn = async () => {
    setErrorText(''); // Clear previous errors
    if (!email || !password) {
      setErrorText('Please enter both email and password.');
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorText('Invalid email format.');
          break;
        case 'auth/user-not-found':
          setErrorText('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorText('Incorrect password.');
          break;
        default:
          setErrorText('Please check your email or password.');
          break;
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Welcome</Text>
      <TextInput
        style={loginStyle.input}
        placeholder="Email"
        placeholderTextColor="blue"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyle.input}
        placeholder="Password"
        placeholderTextColor="blue"
        value={password}
        onChangeText={setPassword}
      />
      {errorText ? <Text style={loginStyle.errortext}>{errorText}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={loginStyle.button} onPress={handleSignIn}>
          <Text style={loginStyle.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <View style={loginStyle.flexdirection}>
        <Text>Don't have any account?</Text>
        <TouchableOpacity onPress={_handlelogin}>
          <Text> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
