import { APIClient } from '../helpers/api_helper';
const baseUrl = `news`;
const api = new APIClient();

export const GetAll = (params) => api.get(baseUrl, params);
export const GetById = (id) => api.get(baseUrl + '/' + id, {});
export const Create = (params) => api.create(baseUrl, params);
export const Update = (params) => api.update(baseUrl, params);
