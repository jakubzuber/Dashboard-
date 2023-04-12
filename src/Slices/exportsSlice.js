import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchExportData = createAsyncThunk('routes/fetchExport', async () => {
    const response = await fetch('./apiRoutesExports', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const exportsSlice = createSlice({
    name: 'exports',
    initialState: {
        exports: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        toggleExportsShow: ({exports}, {payload: exportsId}) => {
            const index = exports.findIndex(({ID_LISTY_LINIOWE}) => ID_LISTY_LINIOWE === exportsId)
            exports[index].show = !exports[index].show
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchExportData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchExportData.fulfilled, (state, action) => {
            state.exports = action.payload.map((order) => ({...order, show: false}))
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchExportData.rejected, (state, action) => {
            state.exports = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

const selectExportsState = state => state.exports

export const {
    toggleExportsShow
} = exportsSlice.actions

export const selectExports = state => selectExportsState(state).exports
export const selectExportsDay = (state, day) => selectExports(state).filter(({CZAS}) => CZAS === day)

export default exportsSlice.reducer;