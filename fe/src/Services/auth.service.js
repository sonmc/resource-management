import { APIClient } from '../helpers/api_helper';
const baseUrl = 'auth';
const api = new APIClient();
// Gets the logged in user data from local session

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
};

// Login Method
export const Login = (data) => api.create(baseUrl + '/login', data);
export const LogoutApi = (data) => api.create(baseUrl + '/logout', data);
export const Register = (data) => api.create(baseUrl + '/register', data);
export const Logout = () => {
    LogoutApi('auth/logout', {});
};
