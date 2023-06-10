import { APIClient } from '../helpers/api_helper';
const baseUrl = `users`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const Delete = (params) => api.delete(baseUrl, params);
export const UpdateInfo = (params) => api.create(baseUrl, params);
export const UpdateAvatar = (params) => api.create(baseUrl + '/change-avatar', params);
export const UpdatePassword = (params) => api.create(baseUrl + '/change-password', params);
export const GetCurrentUser = () => {
    return api.get(baseUrl + '/get-current-user');
};
