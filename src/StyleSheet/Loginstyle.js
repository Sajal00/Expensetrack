import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#3498db',
  },
  button: {
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flexdirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errortext: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  signUp: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default loginStyle;
