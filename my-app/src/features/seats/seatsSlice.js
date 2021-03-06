import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSeats } from './seatsAPI';

const initialState = {
    reservationDetails: {
        seatCount: 5,
        nextTo: false
    },
    hallWidth: 0,
    hallHeight: 0,
    allSeats: [],
    selectedSeatIds: [],
    fetchingSeats: false
};

export const getSeatsAsync = createAsyncThunk('seats/fetchAllSeats', fetchSeats);

export const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        setReservationDetails: (state, action) => {
            let { seatCount, nextTo } = action.payload;
            state.reservationDetails = { seatCount, nextTo };
        },
        selectSeat: (state, action) => {
            if (state.selectedSeatIds.length >= state.reservationDetails.seatCount) {
                return;
            }

            let seatId = action.payload;
            let foundSeat = state.allSeats.find((seat) => seat.id === seatId);

            if (foundSeat) {
                state.selectedSeatIds = [...state.selectedSeatIds, seatId];
            }
        },
        unselectSeat: (state, action) => {
            let seatId = action.payload;

            state.selectedSeatIds = state.selectedSeatIds.filter((id) => {
                return id !== seatId;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSeatsAsync.pending, (state) => {
                state.fetchingSeats = true;
            })
            .addCase(getSeatsAsync.fulfilled, (state, action) => {
                let seats = action.payload;
                state.allSeats = seats;

                let xs = new Set(seats.map((seat) => seat.cords.x));
                let ys = new Set(seats.map((seat) => seat.cords.y));

                state.hallWidth = Math.max(...xs) + 1;
                state.hallHeight = Math.max(...ys) + 1;

                state.fetchingSeats = false;
            });
    }
});

export const selectReservationDetails = (state) => state.seats.reservationDetails;
export const selectHallWidth = (state) => state.seats.hallWidth;
export const selectHallHeight = (state) => state.seats.hallHeight;
export const selectAllSeats = (state) => state.seats.allSeats;
export const selectSelectedSeatIds = (state) => state.seats.selectedSeatIds;
export const selectSelectedSeats = (state) => {
    return state.seats.selectedSeatIds.map((id) => {
        return state.seats.allSeats.find((seat) => seat.id === id);
    });
};
export const selectFetchingSeats = (state) => state.seats.fetchingSeats;



export const { setReservationDetails, selectSeat, unselectSeat } = seatsSlice.actions;
export default seatsSlice.reducer;