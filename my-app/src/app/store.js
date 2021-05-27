import { configureStore } from '@reduxjs/toolkit';
import seatsReducer from '../features/seats/seatsSlice';

export const store = configureStore({
  reducer: {
    seats: seatsReducer
  },
});
