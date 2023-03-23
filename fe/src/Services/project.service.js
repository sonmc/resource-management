import { APIClient } from '../helpers/api_helper';
const baseUrl = `projects`;
const api = new APIClient();

export const FetchProject = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const Update = (params) => api.update(baseUrl, params);
export const AddMember = (params) => api.create(baseUrl + '/add-member', params);
