import { call, put, takeLatest } from 'redux-saga/effects';
import { Login, GetCurrentUser } from '../../helpers/backend_helper';
import { authActions } from './authSlice';
function* loginUser({ payload }) {
    try {
        const response = yield call(Login, {
            username: payload.email,
            password: payload.password,
        });

        localStorage.setItem('authUser', JSON.stringify(response.token));
        yield put(authActions.loginSuccess(response));
    } catch (error) {
        yield put(authActions.apiError(error));
    }
}

function* getCurrentUserSaga({ payload }) {
    const history = payload;
    try {
        const response = yield call(GetCurrentUser);
        yield put(authActions.getCurrentUserSuccess(response));
        history.push('/');
    } catch (error) {
        history.push('/login');
        yield put(authActions.apiError(error));
    }
}

function* logoutUser() {
    try {
        localStorage.removeItem('authUser');
        yield put(authActions.logoutUserSuccess());
    } catch (error) {
        yield put(authActions.apiError(error));
    }
}

function* authSaga() {
    yield takeLatest(authActions.loginUser, loginUser);
    yield takeLatest(authActions.logoutUser, logoutUser);
    yield takeLatest(authActions.getCurrentUser, getCurrentUserSaga);
}

export default authSaga;
