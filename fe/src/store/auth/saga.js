import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Login Redux States
import { GET_CURRENT_USER, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from './actionTypes';
import { apiError, loginSuccess, logoutUserSuccess, getCurrentUserSuccess, getCurrentUser } from './actions';

//Include Both Helper File with needed methods
import { Login, postSocialLogin, GetCurrentUser } from '../../helpers/fakebackend_helper';

function* loginUser({ payload: { user } }) {
    try {
        const response = yield call(Login, {
            account: user.email,
            password: user.password,
            domain: user.domain,
        });
        localStorage.setItem('authUser', JSON.stringify(response.token));
        yield put(loginSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* getCurrentUserSaga({ payload: { history } }) {
    try {
        const response = yield call(GetCurrentUser);
        yield put(getCurrentUserSuccess(response));
        history.push('/');
    } catch (error) {
        history.push('/login');
        yield put(apiError(error));
    }
}

function* logoutUser() {
    try {
        localStorage.removeItem('authUser');
        yield put(logoutUserSuccess(LOGOUT_USER, true));
    } catch (error) {
        yield put(apiError(LOGOUT_USER, error));
    }
}

function* socialLogin({ payload: { data, history, type } }) {
    try {
        const response = yield call(postSocialLogin, data);
        localStorage.setItem('authUser', JSON.stringify(response));
        yield put(loginSuccess(response));
        history.push('/dashboard');
    } catch (error) {
        yield put(apiError(error));
    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeLatest(SOCIAL_LOGIN, socialLogin);
    yield takeEvery(LOGOUT_USER, logoutUser);
    yield takeEvery(GET_CURRENT_USER, getCurrentUserSaga);
}

export default authSaga;
