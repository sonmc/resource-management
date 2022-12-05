import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
} from "./actionTypes";

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: { user },
  };
};

export const loginSuccess = ({ token }) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { token },
  };
};
export const getCurrentUserSuccess = (user) => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload: user,
  };
};
export const getCurrentUser = (history) => {
  return {
    type: GET_CURRENT_USER,
    payload: { history },
  };
};
export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
