// @flow
import { all, call, fork, takeEvery } from "redux-saga/effects";
import { layoutActions } from "./slice";

function changeHTMLAttribute(attribute, value) {
  if (document.documentElement) document.documentElement.setAttribute(attribute, value);
  return true;
}

function* changeLayoutTheme({ payload }) {
  try {
    document.documentElement.removeAttribute("data-sidebar-size");
    yield call(changeHTMLAttribute, "data-layout", payload);
  } catch (error) {
    // console.log(error);
  }
}

export function* watchChangeLayoutType() {
  yield takeEvery(layoutActions.changeLayout, changeLayoutTheme);
}

function* LayoutSaga() {
  yield all([fork(watchChangeLayoutType)]);
}

export default LayoutSaga;
