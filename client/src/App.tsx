import { useAppDispatch, useAppSelector } from "./store/storeHooks"
import { changeWidth, changeHeight } from "./store/dimensionSlice"

function App() {
    const dispatch = useAppDispatch()
    window.addEventListener('resize', () => {
        dispatch(changeHeight())
    })

    window.addEventListener('resize', () => {
        dispatch(changeWidth())
    })


    return (
    <>
            <h1>My Dashboard</h1>
    </>
  )
}

export default App
