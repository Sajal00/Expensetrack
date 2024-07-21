import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addExpenses} from '../Redux/Slice/ExpenseSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PieChart} from 'react-native-chart-kit';

const TrackExpense = () => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);
  const expenses = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expenses.length === 0) {
      getExpenseList();
    } else {
      applyFilters();
      calculateSummary(expenses);
    }
  }, [expenses, startDate, endDate, filterAmount]);

  const getExpenseList = async () => {
    try {
      const data = await AsyncStorage.getItem('myExpensesList');
      console.log('data from AsyncStorage:', data);
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData.length > 0) {
          dispatch(clearExpenses());
          parsedData.forEach(expense => dispatch(addExpenses(expense)));
        } else {
          dispatch(clearExpenses());
        }
      } else {
        dispatch(clearExpenses());
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  const applyFilters = () => {
    let filtered = expenses;

    if (startDate && endDate) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return expenseDate >= start && expenseDate <= end;
      });
    }

    if (filterAmount) {
      filtered = filtered.filter(
        expense => parseFloat(expense.amount) <= parseFloat(filterAmount),
      );
    }

    setFilteredExpenses(filtered);
  };

  const calculateSummary = expenses => {
    let total = 0;
    expenses.forEach(expense => {
      total += parseFloat(expense.amount);
    });
    setTotalSpent(total);
  };

  const chartData = filteredExpenses.map(expense => ({
    name: expense.category,
    amount: parseFloat(expense.amount),
    color:
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Filter by Amount"
        value={filterAmount}
        onChangeText={setFilterAmount}
        keyboardType="numeric"
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Spent: ₹{totalSpent}</Text>
      </View>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
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
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 5,
  },
});

export default TrackExpense;
