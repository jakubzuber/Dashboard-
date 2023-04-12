import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchKrDepartureData = createAsyncThunk('routes/fetchKrDeparture', async() => {
    const response = await fetch('/apiRoutesDomesticDeparture', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const krLoadingsSlice = createSlice({
    name: 'krLoadings',
    initialState: {
        krLoadings: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        toggleLoadingsShow: ({krLoadings}, {payload: krLoadingsId}) => {
            const index = krLoadings.findIndex(({ ID_LISTY_LINIOWE }) => ID_LISTY_LINIOWE === krLoadingsId)
            krLoadings[index].show = !krLoadings[index].show
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchKrDepartureData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchKrDepartureData.fulfilled, (state, action) => {
            state.krLoadings = action.payload.map((order) => ({...order, show: false}))
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchKrDepartureData.rejected, (state, action) => {
            state.krLoadings = []
            state.loading = false
            state.error = action.error.message
        })
    } 
})

const selectKrLoadingsState = state => state.krLoadings

export const {
    toggleLoadingsShow
} = krLoadingsSlice.actions

export const selectKrLoadings = state => selectKrLoadingsState(state).krLoadings
export const selectKrLoadingsDay = (state, day) => selectKrLoadings(state).filter(({CZAS}) => CZAS === day)

export default krLoadingsSlice.reducer;