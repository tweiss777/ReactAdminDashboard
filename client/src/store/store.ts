import { configureStore } from "@reduxjs/toolkit";
import dimensionReducer from './dimensionSlice'
import authenticationReducer from './authenticationSlice'
const store = configureStore({
    reducer: {
        dimensions: dimensionReducer,
        authentication: authenticationReducer
    }
})

export { store }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
