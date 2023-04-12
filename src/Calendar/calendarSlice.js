import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCalendarData = createAsyncThunk('routes/calendar', async() => {
    const response = await fetch('./apiCalendar', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        calendar: [],
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchCalendarData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCalendarData.fulfilled, (state, action) => {
            state.calendar = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchCalendarData.rejected, (state, action) =>{
            state.calendar = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const selectCalendarInfo = state => state.calendar;

export default calendarSlice.reducer;
