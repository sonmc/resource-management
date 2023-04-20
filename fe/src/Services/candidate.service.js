import { APIClient } from '../helpers/api_helper';
const baseUrl = `candidates`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);

export const Upload = (files) => {
    let fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('path', '');
    formData.append('type', '');
    return api.create(baseUrl, formData);
};
