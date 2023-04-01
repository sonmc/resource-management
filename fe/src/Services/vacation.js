import { APIClient } from '../helpers/api_helper';
const baseUrl = `vacations`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const Create = (params) => api.create(baseUrl, params);
export const GetVacations = (params) => api.get(baseUrl + 'getEvent', params);
