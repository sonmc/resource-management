import { APIClient } from '../helpers/api_helper';
const baseUrl = `${process.env.REACT_APP_API_URL}/projects`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl);
export const Create = (params) => api.create(baseUrl, params);
export const Update = (params) => api.update(baseUrl, params);
export const AddMember = (params) => api.create(baseUrl + '/add-member', params);
