import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import SnackBarSlice from './components/SnackBarCustom/SnackBarSlice';

const store = configureStore({
  reducer: {
    snackbar: SnackBarSlice,
  },
});

// Tạo các kiểu dữ liệu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook để sử dụng dispatch với kiểu dữ liệu TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
