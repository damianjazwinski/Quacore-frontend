import { fetchApi } from "./apiUtils";

export const addQuack = (content: string) => {
  return fetchApi("quack/add", { method: "POST", payload: { content } });
};

export const getQuacksFeed = (startingId: number | null) => {
  const urlArgumentString = startingId
    ? `feed?startingId=${startingId}`
    : `feed`;
  return fetchApi(`quack/${urlArgumentString}`);
};

export const getQuacksFeedForUser = (
  username: string,
  startingId: number | null
) => {
  if (startingId) {
    return fetchApi(`quack/get?username=${username}&startingId=${startingId}`);
  }

  return fetchApi(`quack/get?username=${username}`);
};
