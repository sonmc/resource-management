import axios from 'axios';

export const Upload = (files, path, type) => {
    let fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('path', path);
    formData.append('type', type);
    let url = 'https://stg.api.kidsenglish.vn/api/files';
    return axios.post(url, formData);
};
