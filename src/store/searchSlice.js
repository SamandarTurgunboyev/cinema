import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoad: false,
        isSucc: false,
        search: [],
        isFail: null
    },
    reducers: {
        dataLoad: (state, action) => {
            state.isLoad = true
        },
        dataSucc: (state, action) => {
            state.isSucc = true
            state.isLoad = false
            state.search = action.payload
        },
        dataFail: (state, action) => {
            state.isLoad = false
            state.isSucc = false
            state.isFail = action.payload
            state.search = []
        }
    }
})

export const { dataLoad, dataSucc, dataFail } = searchSlice.actions

export default searchSlice.reducer