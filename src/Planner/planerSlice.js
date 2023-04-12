import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateDatabaseSort } from "./updatesToDatabase"

export const fetchPlanerData = createAsyncThunk('planer/data', async() => {
    const response = await fetch('/apiPlaner', {
        method: 'GET',
        headers: {
            'contact-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const planerSlice = createSlice({
    name: 'planer',
    initialState: {
        planer: [],
        loading: false,
        error: ''
    },
    reducers: {
        changeRamp: ({ planer }, { payload: state }) => {
            const index = planer.findIndex(({ ID }) => ID === state.activeItem)
            planer[index].RAMP = state.overContainer
        },
        changeOrder: ({ planer }, { payload: state }) => {
            const activeIndex = planer.findIndex(({ ID }) => ID === state.activeItem)
            const overIndex = planer.findIndex(({ ID }) => ID === state.overItem)
            const muvedObject = state.items[state.activeContainer][state.activeIndex]

            planer.splice(activeIndex, 1)
            planer.splice(overIndex, 0, muvedObject)
        },
        setSort: ({ planer }, { payload: state }) => {
            for (const item of planer) {
                item.SORT = planer.findIndex(({ ID }) => ID === item.ID)
                updateDatabaseSort({ID: item.ID, SORT: item.SORT})
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPlanerData.pending, state => {
            state.loading = true
        });
        builder.addCase(fetchPlanerData.fulfilled, ( state, action ) => {
            state.planer = action.payload
            state.loading = false
            state.error = ''
        });
        builder.addCase(fetchPlanerData.rejected, ( state, action ) => {
            state.planer = []
            state.loading = false
            state.error = action.error.message
        });
    }
});

const selectPlanerState = state => state.planer

export const {
    changeRamp,
    changeOrder,
    setSort
} = planerSlice.actions

export const selectPlaner = state => selectPlanerState(state).planer;
export const selectPlanerRamp = ( state, r ) => selectPlaner(state).filter(({ RAMP }) => RAMP === r);

export default planerSlice.reducer;