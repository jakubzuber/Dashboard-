import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchKrArrivalData = createAsyncThunk('routes/fetchKrArrival', async() => {
    const response = await fetch('/apiRoutesDomesticArrival', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const krArrivalsSlice = createSlice({
    name: 'krArrivals',
    initialState: {
        krArrivals: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        toggleArrivalsShow: ({krArrivals}, {payload: krArrivalsId}) => {
            const index = krArrivals.findIndex(({ ID_LISTY_LINIOWE }) => ID_LISTY_LINIOWE === krArrivalsId)
            krArrivals[index].show = !krArrivals[index].show
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchKrArrivalData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchKrArrivalData.fulfilled, (state, action) => {
            state.krArrivals = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchKrArrivalData.rejected, (state, action) => {
            state.krArrivals = []
            state.loading = false
            state.error = action.error.message
        })
    } 
})

const selectKrArrivalsState = state => state.krArrivals;

export const {
    toggleArrivalsShow
} = krArrivalsSlice.actions

export const selectKrArrivals = state => selectKrArrivalsState(state).krArrivals;
export const selectKrArrivalsDay = (state, day) => selectKrArrivals(state).filter(({CZAS}) => CZAS === day)

export default krArrivalsSlice.reducer;