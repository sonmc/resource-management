import { APIClient } from '../helpers/api_helper';
const baseUrl = `candidates`;
const api = new APIClient();

export const Get = (params) => api.get(baseUrl, params);

export const Upload = (files) => {
    let fileToUpload = files[0];
    const config = {
        headers: {
            'Content-Type': fileToUpload.type,
        },
    };
    const formData = new FormData();
    const encodedFilename = encodeURIComponent(fileToUpload.name);
    formData.append('file', fileToUpload, encodedFilename);
    return api.create(baseUrl, formData, config);
};
