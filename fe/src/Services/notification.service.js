import { APIClient } from '../helpers/api_helper';
const baseUrl = `notifications`;
const api = new APIClient();

export const GetAll = (params) => api.get(baseUrl, params);
