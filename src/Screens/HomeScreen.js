import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddExpense from './AddExpense';
import TrackExpense from './TrackExpense';
import ViewExpense from './View Expense';
import AddIcon from '../SVG Icons/add';
import TrackIcon from '../SVG Icons/Track';
import PreviewIcon from '../SVG Icons/Privew';
const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Add Expense">
      <Tab.Screen
        name="Add Expense"
        component={AddExpense}
        options={{
          tabBarIcon: () => (
            <AddIcon color="red" secondcolor="red" height={30} width={30} />
          ),
        }}
      />
      <Tab.Screen
        name="View Expense"
        component={ViewExpense}
        options={{
          tabBarIcon: () => <PreviewIcon color="red" height={20} width={25} />,
        }}
      />
      <Tab.Screen
        name="Track Expense"
        component={TrackExpense}
        options={{
          tabBarIcon: () => <TrackIcon color="red" height={30} width={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
