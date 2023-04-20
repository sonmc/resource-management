import { APIClient } from '../helpers/api_helper';
const baseUrl = `employees`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const Delete = (params) => api.delete(baseUrl, params);
export const UpdateInfo = (params) => api.update(baseUrl + '/updateInfo', params);
export const UpdatePassword = (params) => api.update(baseUrl + '/updatePassword', params);
