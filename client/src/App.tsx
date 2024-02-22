import { useAppDispatch } from "./store/storeHooks";
import { changeWidth, changeHeight } from "./store/dimensionSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/Navbar";
import Users from "./Components/Users";
import Affiliates from "./Components/Affiliates";
function App() {
    const dispatch = useAppDispatch();

    window.addEventListener("resize", () => {
        dispatch(changeHeight());
    });

    window.addEventListener("resize", () => {
        dispatch(changeWidth());
    });

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/affiliates" element={<Affiliates />} />
                    <Route path="/credits" element={<h1>Credits</h1>}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
