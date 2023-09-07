import { createSlice } from "@reduxjs/toolkit";

const actorsSlice = createSlice({
    name: 'actor',
    initialState: {
        isLoad: false,
        isSucc: false,
        actor: [],
        isFail: null
    },
    reducers: {
        dataLoad: (state, action) => {
            state.isLoad = true
        },
        dataSucc: (state, action) => {
            state.isSucc = true
            state.isLoad = false
            state.actor = action.payload
        },
        dataFail: (state, action) => {
            state.isLoad = false
            state.isSucc = false
            state.isFail = action.payload
            state.actor = []
        }
    }
})

export const { dataLoad, dataSucc, dataFail } = actorsSlice.actions

export default actorsSlice.reducer