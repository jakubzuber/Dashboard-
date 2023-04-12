import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrderDetailsData = createAsyncThunk('routes/ordersDetails', async() => {
    const response = await fetch('/getDataOrdersDetails', {
        method: 'GET', 
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json();
    return data
});

const ordersDetailsSlice = createSlice({
    name: 'ordersDetails',
    initialState: {
        ordersDetails: [],
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchOrderDetailsData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrderDetailsData.fulfilled, (state, action) => {
            state.ordersDetails = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchOrderDetailsData.rejected, (state, action) => {
            state.ordersDetails = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const selectOrdersDetails = state => state.ordersDetails;

export default ordersDetailsSlice.reducer