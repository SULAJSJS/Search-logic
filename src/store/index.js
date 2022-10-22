import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import products from './slice/pruductSlice';


const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    products,
  },
  middleware: customizedMiddleware,
});
