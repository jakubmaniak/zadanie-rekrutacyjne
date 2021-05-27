import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from '../features/navigation/navigationSlice';
import seatsReducer from '../features/seats/seatsSlice';

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
    navigation: navigationReducer
  }
});