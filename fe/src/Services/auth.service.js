import { APIClient } from '../helpers/api_helper';

const baseUrl = 'auth';
const api = new APIClient();
// Gets the logged in user data from local session

// Gets the logged in user data from local session
// Login Method
export const Login = (data) =>
    api.create(baseUrl + '/login', data).then(() => {
        return GetCurrentUser();
    });
export const LogoutApi = () => api.get(baseUrl + '/logout');
export const Register = (data) => api.create(baseUrl + '/register', data);
export const GetCurrentUser = () => api.get(baseUrl + '/getCurrentUser');
export const Logout = () => {
    LogoutApi();
};
