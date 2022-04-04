import { fetchApi } from "./apiUtils";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationTime: string;
  refreshTokenExpirationTime: string;
}

export const login = (username: string, password: string) => {
  return fetchApi("user/login", {
    method: "POST",
    payload: { username, password },
    authorized: false,
  });
};
export const logout = () => {
  return fetchApi("user/logout");
};
export const register = (registerData: {
  username: string;
  password: string;
  email: string;
}) => {
  return fetchApi("user/register", {
    method: "POST",
    payload: registerData,
    authorized: false,
  });
};
