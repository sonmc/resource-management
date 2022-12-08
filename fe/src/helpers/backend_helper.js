import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();
// Gets the logged in user data from local session

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
export const Login = (data) => api.create(url.LOGIN, data);

export const GetCurrentUser = () => api.getWithToken(url.LOGIN);
export const GetEmployee = () => api.getWithToken(url.GET_EMPLOYEES);
