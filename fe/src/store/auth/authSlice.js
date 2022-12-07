import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    error: '',
    loading: false,
    token: localStorage.getItem('authUser') || '',
    currentUser: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state) {
            state.loading = true;
        },
        loginSuccess(state, { payload }) {
            state.loading = false;
            state.token = payload.token;
        },
        getCurrentUserSuccess(state, { payload }) {
            state.loading = false;
            state.currentUser = payload;
        },
        getCurrentUser(state) {
            state.loading = true;
        },
        logoutUser() {},

        logoutUserSuccess(state) {
            state.token = '';
        },

        apiError(state, { payload }) {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authSelector = {
    currentUser: (state) => state['auth'].currentUser,
    token: (state) => state['auth'].token,
    loading: (state) => state['auth'].loading,
    error: (state) => state['auth'].error,
};
const authReducer = authSlice.reducer;

export default authReducer;
