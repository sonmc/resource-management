import { APIClient } from './api_helper';
import * as url from './url_helper';

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

// Register Method
export const Register = (url, data) => {
    return api.create(url, data).catch((err) => {
        var message;
        if (err.response && err.response.status) {
            switch (err.response.status) {
                case 404:
                    message = 'Sorry! the page you are looking for could not be found';
                    break;
                case 500:
                    message = 'Sorry! something went wrong, please contact our support team';
                    break;
                case 401:
                    message = 'Invalid credentials';
                    break;
                default:
                    message = err[1];
                    break;
            }
        }
        throw message;
    });
};
// Login Method
export const Login = (data) => api.create(url.LOGIN, data);
export const GetCurrentUser = () => api.getWithToken(url.LOGIN);
// postForgetPwd
export const ForgetPwd = (data) => api.create(url.PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);
