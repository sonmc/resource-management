import axios from 'axios';
let isRefreshing = false;
let failedQueue = [];
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.defaults.headers.post['Content-Type'] = 'application/json';
let blackListUrl = ['auth/login', 'auth/refresh'];
// intercepting to capture errors
api.interceptors.request.use(function (req) {
    req.withCredentials = true;
    console.log(req);
    const cookieHeaders = req.headers['Cookie'];
    console.log(cookieHeaders);
    return req;
});
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (res) => {
        return res.data ? res.data : res;
    },
    (err) => {
        const originalRequest = err.config;
        const isblacklist = originalRequest ? blackListUrl.includes(originalRequest.url) : true;
        if (!isblacklist && err.response) {
            if (err.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            originalRequest.headers['Authorization'] = 'Bearer ' + token;
                            return api(originalRequest);
                        })
                        .catch((err) => {
                            return Promise.reject(err);
                        });
                }

                originalRequest._retry = true;
                isRefreshing = true;
                return new Promise(function (resolve, reject) {
                    api.get('auth/refresh')
                        .then((rs) => {
                            originalRequest.headers['Authorization'] = `bearer ${rs}`;
                            processQueue(null, rs);
                            resolve(api(originalRequest));
                        })
                        .catch((err) => {
                            processQueue(err, null);
                            reject(err);
                        })
                        .then(() => {
                            isRefreshing = false;
                        });
                });
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

    delete = (url, id) => {
        return api.delete(url + '/' + id);
    };
}

export { APIClient };
