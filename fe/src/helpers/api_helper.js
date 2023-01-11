import axios from "axios";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

const setAuthorization = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};

const removeAuthorization = () => {
  delete axios.defaults.headers.common["Authorization"];
};

class APIClient {
  getWithToken = (url, params) => {
    setAuthorization();
    let response;

    let paramKeys = [];
    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  createWithToken = (url, data) => {
    setAuthorization();
    return axios.post(url, data);
  };

  updateWithToken = (url, data) => {
    setAuthorization();
    return axios.put(url + "/" + data.id, data);
  };

  deleteWithToken = (url, config) => {
    setAuthorization();
    return axios.delete(url, { ...config });
  };

  get = (url, params) => {
    removeAuthorization();
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  create = (url, data) => {
    removeAuthorization();
    return axios.post(url, data);
  };

  update = (url, data) => {
    removeAuthorization();
    return axios.put(url, data);
  };

  delete = (url, config) => {
    removeAuthorization();
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
