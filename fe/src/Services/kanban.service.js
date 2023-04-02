import { APIClient } from '../helpers/api_helper';
const baseUrl = `kanbans`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);
export const CreateKanbanColumn = (params) => api.create(baseUrl, params);
export const CreateTask = (params) => api.create(baseUrl, params);
export const UpdateKanbanColumn = (params) => api.create(baseUrl, params);
export const UpdateIndexTask = (params) => api.create(baseUrl, params);
export const Update = (params) => api.update(baseUrl, params);
export const DeleteKanbanColumn = (params) => api.delete(baseUrl, params);
export const DeleteTask = (params) => api.delete(baseUrl, params);
