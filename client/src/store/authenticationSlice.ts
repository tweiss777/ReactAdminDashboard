import { createSlice } from "@reduxjs/toolkit";
export type AuthenticationState = {
  isLoggedIn: boolean;
};

const initialStateAuthentication: AuthenticationState = {
  isLoggedIn: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialStateAuthentication,
  reducers: {
    setIsLoggedIn: (state, {payload}: {payload:boolean} ) => {
      state.isLoggedIn = payload;
    },
  },
});


export const { setIsLoggedIn } = authenticationSlice.actions
export default authenticationSlice.reducer
