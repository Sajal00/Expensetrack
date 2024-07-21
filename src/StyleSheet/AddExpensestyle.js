import {StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const AddExpenseStyle = StyleSheet.create({
  container: {
    height: deviceHeight / 1.3,
    width: deviceWidth,
    padding: 20,
    // marginBottom: 50,
    // justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    height: 40,
  },
  KeyboardAvoidingView: {height: deviceHeight, width: deviceWidth},
  SafeAreaView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default AddExpenseStyle;
