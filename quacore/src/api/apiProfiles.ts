import { fetchApi } from "./apiUtils";

export const getProfile = (username: string) => {
  return fetchApi("profile", username, { method: "GET" });
};
