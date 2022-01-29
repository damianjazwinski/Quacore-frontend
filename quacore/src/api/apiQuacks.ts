import { fetchApi } from "./apiUtils";

export const addQuack = (content: string) => {
  return fetchApi("quack", "add", "POST", { content });
};

export const getQuacksFeed = (startingId: number | null) => {
  const urlArgumentString = startingId
    ? `feed?startingId=${startingId}`
    : `feed`;
  return fetchApi("quack", urlArgumentString);
};
