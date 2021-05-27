import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 'details'
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        navigateTo: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

export const selectCurrentPage = (state) => state.navigation.currentPage;

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;