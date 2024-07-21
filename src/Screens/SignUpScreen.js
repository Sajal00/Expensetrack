import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import loginStyle from '../StyleSheet/Loginstyle';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const _handleSignup = async () => {
    setErrorText('');
    if (!name || !email || !password) {
      setErrorText('Please fill in all the fields.');
      return;
    }
    setLoading(true);
    try {
      const userdata = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User account created & signed in!');
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        console.log('Password should be at least 6 characters');
      }
    } finally {
      setLoading(false);
    }
  };
  const handlelogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Fill Details</Text>
      <TextInput
        style={loginStyle.input}
        placeholder="Name"
        placeholderTextColor="#3498db"
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyle.input}
        placeholder="Email"
        placeholderTextColor="#3498db"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyle.input}
        placeholder="Password"
        placeholderTextColor="#3498db"
        value={password}
        onChangeText={setPassword}
      />
      {errorText ? <Text style={loginStyle.errortext}>{errorText}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={loginStyle.button} onPress={_handleSignup}>
          <Text style={loginStyle.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      <View style={loginStyle.flexdirection}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handlelogin}>
          <Text style={loginStyle.signUp}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
