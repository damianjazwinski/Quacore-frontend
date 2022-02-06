import { fetchApi } from "./apiUtils";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationTime: string;
  refreshTokenExpirationTime: string;
}

export const login = (username: string, password: string) => {
  return fetchApi("user", "login", "POST", { username, password }, false);
};
export const logout = () => {
  return fetchApi("user", "logout", "GET");
};
export const register = (registerData: {
  username: string;
  password: string;
  email: string;
}) => {
  return fetchApi("user", "register", "POST", registerData, false);
};
