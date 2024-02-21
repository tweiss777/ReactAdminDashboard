import { useAppDispatch, useAppSelector } from "./store/storeHooks"
import { changeWidth, changeHeight } from "./store/dimensionSlice"

function App() {
    const dispatch = useAppDispatch()
    const height:number = useAppSelector(state => state.dimensions.height)
    const width: number = useAppSelector(state => state.dimensions.width)
    window.addEventListener('resize', () => {
        dispatch(changeHeight())
    })

    window.addEventListener('resize', () => {
        dispatch(changeWidth())
    })


    return (
    <>
            <h1>My Dashboard</h1>
            <p>Current Height: {height}</p>
            <p>Current Width: {width} </p>
    </>
  )
}

export default App
