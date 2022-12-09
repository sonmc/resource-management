import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export const Get = (url) => api.getWithToken(url);
export const Update = (url, params) => api.updateWithToken(url, params);
export const Create = (url, params) => api.createWithToken(url, params);
