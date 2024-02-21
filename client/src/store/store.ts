import { configureStore } from "@reduxjs/toolkit";
import dimensionReducer from './dimensionSlice'
const store = configureStore({
    reducer: {
        dimensions: dimensionReducer
    }
})

export { store }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
