import { APIClient } from '../helpers/api_helper';
const baseUrl = `permissions`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const Update = (params) => api.update(baseUrl, params);
export const Delete = (params) => api.delete(baseUrl, params);
