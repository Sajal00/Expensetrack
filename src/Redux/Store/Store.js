import {configureStore} from '@reduxjs/toolkit';
import ExpenseSlice from '../Slice/ExpenseSlice';

export default configureStore({
  reducer: {
    expenses: ExpenseSlice,
  },
});
