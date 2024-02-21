import { createSlice } from "@reduxjs/toolkit";

export type DimensionState = {
    height: number,
    width: number,

}

const initialState: DimensionState = {
    height: window.innerHeight,
    width: window.innerWidth
}


const dimensionSlice = createSlice({
    name: 'dimensions',
    initialState: initialState,
    reducers: {
        changeHeight: (state) => {
            state.height = window.innerHeight
        },
        changeWidth: (state) => {
            state.width = window.innerWidth
        }
    }

})

export const { changeHeight, changeWidth } = dimensionSlice.actions
export default dimensionSlice.reducer
