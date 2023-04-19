import { APIClient } from '../helpers/api_helper';
const baseUrl = `cvs`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Upload = (params) => api.create(baseUrl, params);
