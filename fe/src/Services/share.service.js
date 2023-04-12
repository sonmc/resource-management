import { APIClient } from '../helpers/api_helper';
const baseUrl = `files/upload`;
const api = new APIClient();

export const Upload = (files, path, type) => {
    let fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('path', path);
    formData.append('type', type);
    return api.create(baseUrl, formData);
};
