import {StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const ViewExpenseStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  contentContainer: {
    marginBottom: 40,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#264653',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#e9c46a',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#264653',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#e76f51',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewExpenseStyle;
