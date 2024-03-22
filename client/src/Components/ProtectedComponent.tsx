import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { setIsLoggedIn } from "../store/authenticationSlice";
import { Navigate } from "react-router-dom";
import getToken from "../utils/getToken";
interface IProps {
  children: JSX.Element | JSX.Element[];
}

export default function ProtectedComponent(props: IProps) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    verifyJwt();
  }, []);

  async function verifyJwt() {
    try {
      const token = getToken();
      if (token) {
        const { status } = await axios.post(
          "api/v1/auth/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (status === 200) {
            localStorage.setItem('isLoggedIn','true')
          dispatch(setIsLoggedIn(true));
        } else {
            localStorage.removeItem('isLoggedIn')
          dispatch(setIsLoggedIn(false));
        }
      } else {
        localStorage.removeItem('isLoggedIn')
        dispatch(setIsLoggedIn(false));
      }
    } catch (error) {
        localStorage.removeItem('isLoggedIn')
      dispatch(setIsLoggedIn(false));
    }
  }

    const persistedLogin = localStorage.getItem('isLoggedIn')
    if(persistedLogin === 'true'){
        dispatch(setIsLoggedIn(true))
        return <>{props.children} </>
    }

    else{
        return <Navigate to={"/login"} />;
    }
}
