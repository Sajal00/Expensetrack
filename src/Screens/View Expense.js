import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeExpense} from '../Redux/Slice/ExpenseSlice';

const ViewExpense = () => {
  const expenses = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  const handleDelete = index => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch(removeExpense(index)), // Dispatch action to remove expense
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.itemContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.amount}>Amount: ${item.amount}</Text>
              <Text style={styles.category}>Category: {item.category}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.description}>
                Description: {item.description}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(index)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    elevation: 2, // For Android shadow
    position: 'relative', // Needed for positioning the delete button
  },
  contentContainer: {
    marginBottom: 40, // Space for the delete button
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
    color: '#f1faee',
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

export default ViewExpense;
