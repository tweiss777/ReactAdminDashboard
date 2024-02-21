import { useAppDispatch } from "./store/storeHooks"
import { changeWidth, changeHeight } from "./store/dimensionSlice"
import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import React from "react"
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
            <RouterProvider router={router} />
    </>
  )
}

export default App
