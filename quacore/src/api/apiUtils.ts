import { LoginResponse } from "./apiAuth";

export const apiUrl = "https://localhost:5001/api/";

export const fetchApi = (
  url: string,
  {
    method = "GET",
    payload = undefined,
    authorized = true,
  }: { method?: string; payload?: any; authorized?: boolean } = {}
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const authDataJson = localStorage["authData"];

  if (authorized && authDataJson !== undefined) {
    const authData: LoginResponse = JSON.parse(authDataJson);
    const token = authData.accessToken;
    myHeaders.append("Authorization", `Bearer ${token}`);
  }
  const fetchOptions: RequestInit = {
    body: JSON.stringify(payload),
    method: method,
    headers: myHeaders,
  };
  const address = apiUrl + url;
  return fetch(address, fetchOptions);
};
