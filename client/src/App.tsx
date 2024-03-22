import { useAppDispatch, useAppSelector } from "./store/storeHooks";
import { changeWidth, changeHeight } from "./store/dimensionSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/Navbar";
import Users from "./Components/Users";
import Affiliates from "./Components/Affiliates";
import CreditLog from "./Components/CreditLog";
import Login from "./Components/Login";
import ProtectedComponent from "./Components/ProtectedComponent";
function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  window.addEventListener("resize", () => {
    dispatch(changeHeight());
  });

  window.addEventListener("resize", () => {
    dispatch(changeWidth());
  });

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <NavBar />}
        <Routes>
          {/*todo encapsulate all routes but login with Protected route component*/}
          <Route
            path="/"
            element={
              <ProtectedComponent>
                <Users />
              </ProtectedComponent>
            }
          />
          <Route
            path="/affiliates"
            element={
              <ProtectedComponent>
                <Affiliates />
              </ProtectedComponent>
            }
          />
          <Route
            path="/credits"
            element={
              <ProtectedComponent>
                <CreditLog />
              </ProtectedComponent>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
