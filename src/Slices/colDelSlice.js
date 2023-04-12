import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchColDelData = createAsyncThunk('routes/fetchColDelData', async() => {
    const response = await fetch('/getSelfTransport', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const colDelSlice = createSlice({
    name: 'colDel',
    initialState: {
        colDel: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchColDelData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchColDelData.fulfilled, (state, action) => {
            state.colDel = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchColDelData.rejected, (state, action) => {
            state.colDel = []
            state.loading = false
            state.error = action.error.message
        })
    } 
});

const selectColDelData = state => state.colDel;

export const selectColDel = state => selectColDelData(state).colDel;
export const selectColDelDay = (state, day) => selectColDel(state).filter(({KIEDY}) => KIEDY === day)

export default colDelSlice.reducer;