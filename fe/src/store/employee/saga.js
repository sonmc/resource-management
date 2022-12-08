import { call, put, takeLatest } from "redux-saga/effects";
import { GetEmployee } from "../../helpers/backend_helper";
import { employeeActions } from "./slice";

function* getEmployeeSaga({ payload }) {
  // eslint-disable-next-line no-debugger
  debugger;
  console.log(payload);
  try {
    const response = yield call(GetEmployee);
    yield put(employeeActions.getEmployeeSuccess(response));
  } catch (error) {
    yield put(employeeActions.apiError(error));
  }
}

function* employeeSaga() {
  yield takeLatest(employeeActions.getEmployee, getEmployeeSaga);
}

export default employeeSaga;
