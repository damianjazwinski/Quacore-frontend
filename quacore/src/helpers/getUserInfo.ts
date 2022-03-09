import jwtDecode from "jwt-decode";
import { store } from "../store";
import { JwtToken } from "../types/types";

export const getUsernameFromClaims = () => {
  const { accessToken: token } = store.getState().quacore;
  const { Username: username } = jwtDecode<JwtToken>(token!);
  return username;
};
