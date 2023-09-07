import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import actorsSlice from './actorsSlice'
import searchSlice from './searchSlice'
import idSlice from './idSlice'

export default configureStore({
    reducer: {
        data: dataSlice,
        actor: actorsSlice,
        search: searchSlice,
        idData: idSlice
    }
})