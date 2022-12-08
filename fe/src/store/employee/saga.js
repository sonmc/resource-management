import { call, put, takeLatest } from "redux-saga/effects";
import { GetCurrentUser } from "../../helpers/backend_helper";
import { employeeActions } from "./slice";

function* getEmployeeSaga({ payload }) {
  const history = payload;
  try {
    const response = yield call(GetCurrentUser);
    yield put(employeeActions.getEmployeeSuccess(response));
    history.push("/");
  } catch (error) {
    history.push("/login");
    yield put(employeeActions.apiError(error));
  }
}

function* employeeSaga() {
  yield takeLatest(employeeActions.getCurrentUser, getEmployeeSaga);
}

export default employeeSaga;
