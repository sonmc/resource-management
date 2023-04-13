import { APIClient } from '../helpers/api_helper';
const baseUrl = `lunch-order`;
const api = new APIClient();

export const Create = (params) => api.create(baseUrl, params);
export const Get = (params) => api.get(baseUrl, params);
