import { APIClient } from "../helpers/api_helper";

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
export const Login = (url, data) => api.create(url, data);
export const Register = (url, data) => api.create(url, data);
export const GetCurrentUser = (url) => api.getWithToken(url);
