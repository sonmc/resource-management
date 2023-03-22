import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.defaults.headers.post['Content-Type'] = 'application/json';

// intercepting to capture errors
api.interceptors.request.use(function (req) {
    req.withCredentials = true;
    return req;
});
api.interceptors.response.use(
    (res) => {
        return res.data ? res.data : res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/auth/login' && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    const rs = await api.post('auth/refresh', currentUser);
                    originalConfig.headers['Authorization'] = `bearer ${rs}`;
                    return api(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
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
            response = api.get(`${url}?${queryString}`, params);
        } else {
            response = api.get(`${url}`, params);
        }
        return response;
    };

    create = (url, data) => {
        return api.post(url, data);
    };

    update = (url, data) => {
        return api.put(url, data);
    };

    delete = (url, config) => {
        return api.delete(url, { ...config });
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
