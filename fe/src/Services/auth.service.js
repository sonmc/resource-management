import { APIClient } from '../helpers/api_helper';

const baseUrl = 'api/auth';
const api = new APIClient();

export const Login = (data) =>
    api.create(baseUrl + '/login', data).then((res) => {
        return res;
    });
export const LogoutApi = () => api.get(baseUrl + '/logout');
export const Register = (data) => api.create(baseUrl + '/register', data);
export const Logout = () => {
    LogoutApi();
};
