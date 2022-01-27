import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "./api/apiAuth";

const getInitialState = () => {
  const authDataJson = localStorage["authData"];
  if (authDataJson === undefined) {
    return { auth: false };
  }
  const authData: LoginResponse = JSON.parse(authDataJson);
  const accessTokenExpirationTime = Date.parse(
    authData.accessTokenExpirationTime
  );
  if (accessTokenExpirationTime > Date.now()) {
    return { auth: true, ...authData };
  } else {
    return { auth: false };
  }
};

interface QuacoreState {
  auth: boolean;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpirationTime?: string;
  refreshTokenExpirationTime?: string;
}

const initalState: QuacoreState = {
  ...getInitialState(),
};

export const quacoreSlice = createSlice({
  name: "quacore",
  initialState: initalState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.auth = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessTokenExpirationTime =
        action.payload.accessTokenExpirationTime;
      state.refreshTokenExpirationTime =
        action.payload.refreshTokenExpirationTime;
    },
    logout: (state) => {
      state.auth = false;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.accessTokenExpirationTime = undefined;
      state.refreshTokenExpirationTime = undefined;
    },
  },
});

export const { login, logout } = quacoreSlice.actions;
export default quacoreSlice.reducer;
