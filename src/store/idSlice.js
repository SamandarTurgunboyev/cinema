import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
    name: 'IDdata',
    initialState: {
        isLoad: false,
        isSucc: false,
        data: [],
        actors: [],
        img: [],
        isFail: false
    },
    reducers: {
        loadData: (state) => {
            state.isLoad = true
        },
        loadSucc: (state, action) => {
            state.isLoad = false
            state.isSucc = true
            state.data = action.payload
        },
        loadImg: (state, action) => {
            state.img = action.payload
        },
        loadActor: (state, action) => {
            state.actors = action.payload
        }
    }
})

export const { loadData, loadSucc, loadImg, loadActor } = idSlice.actions

export default idSlice.reducer