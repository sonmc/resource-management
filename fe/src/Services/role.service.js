import { APIClient } from '../helpers/api_helper';
const baseUrl = `${process.env.REACT_APP_API_URL}/roles`;
const api = new APIClient();

export const Get = (params) => api.getWithToken(baseUrl, params);
export const Create = (params) => api.createWithToken(baseUrl, params);
export const Update = (params) => api.updateWithToken(baseUrl, params);
export const Delete = (params) => api.deleteWithToken(baseUrl, params);
