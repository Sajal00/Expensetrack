import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  addExpenses,
  removeExpense,
  clearExpenses,
} from '../Redux/Slice/ExpenseSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../Redux/Store/Store';

const ViewExpense = () => {
  let expenses = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      getExpenseList();
    }
  }, [expenses, dispatch]);

  const getExpenseList = async () => {
    try {
      const data = await AsyncStorage.getItem('myExpensesList');
      if (data) {
        const parsedData = JSON.parse(data);
        parsedData.forEach(expense => dispatch(addExpenses(expense)));
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  const handleDelete = async id => {
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
          onPress: async () => {
            dispatch(removeExpense(id));

            try {
              const state = store.getState();
              const updatedExpensesList = state.expenses;

              await AsyncStorage.setItem(
                'myExpensesList',
                JSON.stringify(updatedExpensesList),
              );
              if (updatedExpensesList.length === 0) {
                dispatch(clearExpenses());
              }
            } catch (error) {
              console.error(
                'Error updating AsyncStorage after deletion:',
                error,
              );
            }
          },
        },
      ],
    );
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateB - dateA !== 0) {
      return dateB - dateA;
    }
    return b.amount - a.amount;
  });

  return (
    <View style={styles.container}>
      {sortedExpenses && sortedExpenses.length > 0 ? (
        <FlatList
          data={sortedExpenses}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.amount}>Amount: ₹{item.amount}</Text>
                <Text style={styles.category}>Category: {item.category}</Text>
                <Text style={styles.date}>Date: {item.date}</Text>
                <Text style={styles.description}>
                  Description: {item.description}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>no data found</Text>
      )}
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

export default ViewExpense;
