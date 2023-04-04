import { APIClient } from '../helpers/api_helper';
const baseUrl = `employees`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const GetLunch = (params) => api.get(baseUrl + '/lunch', params);
