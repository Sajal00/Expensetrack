import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import loginStyle from '../StyleSheet/Loginstyle';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <TouchableOpacity style={loginStyle.button}>
        <Text style={loginStyle.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
