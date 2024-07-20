import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddExpense from './AddExpense';
import TrackExpense from './TrackExpense';
import AllExpense from './AllExpense';
const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Add Expense">
      <Tab.Screen name="Add Expense" component={AddExpense} />
      <Tab.Screen name="All Expense" component={AllExpense} />
      <Tab.Screen name="Track Expense" component={TrackExpense} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
