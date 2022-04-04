import { fetchApi } from "./apiUtils";

export const getProfile = (username: string) => {
  return fetchApi(`profile/${username}`, { method: "GET" });
};

export const editProfile = (
  username: string,
  description: string,
  avatarImageLink: string,
  bannerImageLink: string
) => {
  return fetchApi(`profile/${username}/update`, {
    method: "POST",
    payload: { description, avatarImageLink, bannerImageLink },
  });
};
