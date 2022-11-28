import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR, GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS } from './actionTypes';

const initialState = {
    error: '',
    loading: false,
    token: localStorage.getItem('authUser') || '',
    currentUser: null,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            state = {
                ...state,
                loading: true,
            };
            break;
        case LOGIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                token: action.payload.token,
            };
            break;
        case GET_CURRENT_USER:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_CURRENT_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                currentUser: action.payload,
            };
            break;
        case LOGOUT_USER:
            state = { ...state };
            break;
        case LOGOUT_USER_SUCCESS:
            state = { ...state, token: '' };
            break;
        case API_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default auth;
