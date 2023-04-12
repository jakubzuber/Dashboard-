import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrderData = createAsyncThunk('routes/orders', async() => {
    const response = await fetch('/getDataOrders', {
        method: 'GET', 
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json();
    return data
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchOrderData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrderData.fulfilled, (state, action) => {
            state.orders = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchOrderData.rejected, (state, action) => {
            state.orders = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const selectOrders = state => state.orders;

export default ordersSlice.reducer