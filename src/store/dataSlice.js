import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        isLoad: false,
        isSucc: false,
        data: [],
        isFail: null
    },
    reducers: {
        dataLoad: (state, action) => {
            state.isLoad = true
        },
        dataSucc: (state, action) => {
            state.isSucc = true
            state.isLoad = false
            state.data = action.payload
        },
        dataFail: (state, action) => {
            state.isLoad = false
            state.isSucc = false
            state.isFail = action.payload
            state.data = []
        }
    }
})

export const { dataLoad, dataSucc, dataFail } = dataSlice.actions

export default dataSlice.reducer