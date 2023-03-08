import axios from 'axios';

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';

// intercepting to capture errors
axios.interceptors.request.use(function (req) {
    req.withCredentials = true;
    return req;
});

axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    async (error) => {
        if (error.response.status === 401) {
            // const currentUser = JSON.parse(localStorage.getItem('user'));
            // const url = `${process.env.REACT_APP_API_URL}/auth/refresh`;
            // let apiResponse = await axios.post(url, currentUser);
            // localStorage.setItem('tokens', JSON.stringify(apiResponse.data));
            // error.config.headers['Authorization'] = `bearer ${apiResponse.data.access_token}`;
            // return axios(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);

class APIClient {
    get = (url, params) => {
        let response;
        let paramKeys = [];
        if (params) {
            Object.keys(params).map((key) => {
                paramKeys.push(key + '=' + params[key]);
                return paramKeys;
            });
            const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    };

    create = (url, data) => {
        return axios.post(url, data);
    };

    update = (url, data) => {
        return axios.put(url, data);
    };

    delete = (url, config) => {
        return axios.delete(url, { ...config });
    };
}

const getLoggedinUser = () => {
    const user = localStorage.getItem('user');
    if (!user) {
        return null;
    } else {
        return JSON.parse(user);
    }
};

export { APIClient, getLoggedinUser };
