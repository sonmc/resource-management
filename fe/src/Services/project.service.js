import { APIClient } from '../helpers/api_helper';
const baseUrl = `${process.env.REACT_APP_API_URL}/projects`;
const api = new APIClient();

export const FetchProject = (params) => api.createWithToken(baseUrl, params);
export const Create = (params) => api.createWithToken(baseUrl, params);
export const Update = (params) => api.updateWithToken(baseUrl, params);
export const AddMember = (params) => api.createWithToken(baseUrl + '/add-member', params);
