import { LoginResponse } from "./apiAuth";

export const apiUrl = "https://localhost:5001/api/";

export const fetchApi = (
  controller: string,
  action: string,
  method = "GET",
  payload: any = undefined,
  authorized = true
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
  const address = apiUrl + controller + "/" + action;
  return fetch(address, fetchOptions);
};