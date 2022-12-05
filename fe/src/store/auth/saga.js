import { call, put, takeLatest } from "redux-saga/effects";

// Login Redux States
import { GET_CURRENT_USER, LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  getCurrentUserSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import { Login, GetCurrentUser } from "../../helpers/backend_helper";

function* loginUser({ payload: { user } }) {
  try {
    const response = yield call(Login, {
      username: user.email,
      password: user.password,
    });
    localStorage.setItem("authUser", JSON.stringify(response.token));
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getCurrentUserSaga({ payload: { history } }) {
  try {
    const response = yield call(GetCurrentUser);
    yield put(getCurrentUserSuccess(response));
    history.push("/");
  } catch (error) {
    history.push("/login");
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(LOGOUT_USER, logoutUser);
  yield takeLatest(GET_CURRENT_USER, getCurrentUserSaga);
}

export default authSaga;
