import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchImportData = createAsyncThunk('routes/fetchImport', async() => {
    const response = await fetch('./apiRoutesImports', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const importsSlice = createSlice({
    name: 'imports',
    initialState: {
        imports: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        toggleImportsShow: ({imports}, {payload: importsId}) => {
            const index = imports.findIndex(({ID_LISTY_LINIOWE}) => ID_LISTY_LINIOWE === importsId)
            imports[index].show = !imports[index].show
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchImportData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchImportData.fulfilled, (state, action) => {
            state.imports = action.payload.map((order) => ({...order, show: false}))
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchImportData.rejected, (state, action) => {
            state.imports = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

const selectImportsState = state => state.imports

export const {
    toggleImportsShow
} = importsSlice.actions

export const selectImports = state => selectImportsState(state).imports
export const selectImportsDay = (state, day) => selectImports(state).filter(({CZAS}) => CZAS === day)

export default importsSlice.reducer;