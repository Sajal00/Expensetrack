import {createSlice} from '@reduxjs/toolkit';

const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpenses(state, action) {
      state.push(action.payload);
    },
    removeExpense(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export const {addExpenses, removeExpense} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
