import { fetchApi } from "./apiUtils";

export const addQuack = (content: string) => {
  return fetchApi("quack", "add", "POST", { content });
};

export const getQuacksFeed = () => {
  return fetchApi("quack", "feed");
};
