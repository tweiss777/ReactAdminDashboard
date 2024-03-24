import { useAppDispatch, useAppSelector } from "./store/storeHooks";
import { changeWidth, changeHeight } from "./store/dimensionSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/Navbar";
import Users from "./Components/Users";
import Affiliates from "./Components/Affiliates";
import CreditLog from "./Components/CreditLog";
import Login from "./Components/Login";
import ProtectedComponent from "./Components/ProtectedComponent";
import AdminRoute from "./Components/AdminRoute";
import NotFound from "./Components/NotFound";

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
          <Route path="/*" element={
                    <NotFound />
                    }/>
        
          <Route
            path="/"
            element={
              <ProtectedComponent>
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </ProtectedComponent>
            }
          />
          <Route
            path="/affiliates"
            element={
              <ProtectedComponent>
                <AdminRoute>
                  <Affiliates />
                </AdminRoute>
              </ProtectedComponent>
            }
          />
          <Route
            path="/credits"
            element={
              <ProtectedComponent>
                <AdminRoute>
                  <CreditLog />
                </AdminRoute>
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
