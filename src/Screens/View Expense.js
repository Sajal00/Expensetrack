import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ViewExpenseStyle from '../StyleSheet/ViewExpenseStyle';
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
    <View style={ViewExpenseStyle.container}>
      {sortedExpenses && sortedExpenses.length > 0 ? (
        <FlatList
          data={sortedExpenses}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={ViewExpenseStyle.itemContainer}>
              <View style={ViewExpenseStyle.contentContainer}>
                <Text style={ViewExpenseStyle.amount}>
                  Amount: ₹{item.amount}
                </Text>
                <Text style={ViewExpenseStyle.category}>
                  Category: {item.category}
                </Text>
                <Text style={ViewExpenseStyle.date}>Date: {item.date}</Text>
                <Text style={ViewExpenseStyle.description}>
                  Description: {item.description}
                </Text>
              </View>
              <TouchableOpacity
                style={ViewExpenseStyle.deleteButton}
                onPress={() => handleDelete(item.id)}>
                <Text style={ViewExpenseStyle.deleteButtonText}>Delete</Text>
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

export default ViewExpense;
