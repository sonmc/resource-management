import { APIClient } from '../helpers/api_helper';
const baseUrl = `files/upload`;
const api = new APIClient();

export const Upload = (files) => {
    let fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return api.create(baseUrl, formData).then((res) => {
        return { imagePath: process.env.REACT_APP_API_URL + '/' + res.imagePath };
    });
};
