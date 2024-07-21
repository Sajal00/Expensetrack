import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AddExpenseStyle from '../StyleSheet/AddExpensestyle';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {addExpenses} from '../Redux/Slice/ExpenseSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const myExpensesList = useSelector(state => state.expenses);

  const handleAddExpense = async () => {
    Keyboard.dismiss();
    if (!amount || !category || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const generateRandomId = () => {
      return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    };

    const newExpense = {
      id: generateRandomId(),
      amount,
      category,
      date: format(date, 'yyyy-MM-dd'),
      description,
    };

    dispatch(addExpenses(newExpense));

    try {
      const updatedExpensesList = [...myExpensesList, newExpense];

      await AsyncStorage.setItem(
        'myExpensesList',
        JSON.stringify(updatedExpensesList),
      );
      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }

    setAmount('');
    setCategory('');
    setDate(new Date());
    setDescription('');
  };

  return (
    <KeyboardAvoidingView
      style={AddExpenseStyle.KeyboardAvoidingView}
      behavior="padding">
      <SafeAreaView style={AddExpenseStyle.SafeAreaView}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={AddExpenseStyle.container}>
            <Text style={AddExpenseStyle.label}>Amount</Text>
            <TextInput
              style={AddExpenseStyle.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={AddExpenseStyle.label}>Category</Text>
            <TextInput
              style={AddExpenseStyle.input}
              value={category}
              onChangeText={setCategory}
            />

            <Text style={AddExpenseStyle.label}>Date</Text>
            <View style={AddExpenseStyle.dateInputContainer}>
              <TextInput
                style={AddExpenseStyle.dateInput}
                value={format(date, 'yyyy-MM-dd')}
                editable={false}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>date</Text>
                {/* <Icon name="calendar-today" size={30} color="gray" /> */}
              </TouchableOpacity>
            </View>

            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={selectedDate => {
                setOpen(false);
                setDate(selectedDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <Text style={AddExpenseStyle.label}>Description</Text>
            <TextInput
              style={AddExpenseStyle.input}
              value={description}
              onChangeText={setDescription}
            />

            <Button title="Add Expense" onPress={handleAddExpense} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddExpense;
