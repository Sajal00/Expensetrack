import {createSlice} from '@reduxjs/toolkit';

const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpenses(state, action) {
      state.push(action.payload);
    },
    removeExpense(state, action) {
      return state.filter(expense => expense.id !== action.payload);
    },
    clearExpenses(state) {
      return [];
    },
  },
});

export const {addExpenses, removeExpense, clearExpenses} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
