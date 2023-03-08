import { APIClient } from '../helpers/api_helper';
const baseUrl = `${process.env.REACT_APP_API_URL}/permissions`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const Update = (params) => api.updateWithToken(baseUrl, params);
export const Delete = (params) => api.delete(baseUrl, params);
